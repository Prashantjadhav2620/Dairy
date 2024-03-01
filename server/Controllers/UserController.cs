using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using BCrypt.Net;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.ComponentModel.DataAnnotations;
using DairyApp.Models;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public UserController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost("register")]
    public IActionResult RegisterUser(UserModel user)
    {
        // Validate if the user already exists (you should check against the database)
        bool userExists = CheckIfUserExists(user.Username);

        if (userExists)
            return BadRequest("Username already exists");

        // Validate required fields and format
        var validationResults = new List<ValidationResult>();
        if (!Validator.TryValidateObject(user, new ValidationContext(user), validationResults, validateAllProperties: true))
            return BadRequest(validationResults.First().ErrorMessage);

        // Hash the password before storing it
        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password);

        using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        {
            connection.Open();
            using (SqlCommand cmd = new SqlCommand("INSERT INTO [User] (Username, EmailId, Password, MobileNumber, Date) VALUES (@Username, @EmailId, @Password, @MobileNumber, @Date)", connection))
            {
                cmd.Parameters.AddWithValue("@Username", user.Username);
                cmd.Parameters.AddWithValue("@EmailId", user.EmailId);
                cmd.Parameters.AddWithValue("@Password", hashedPassword);
                cmd.Parameters.AddWithValue("@MobileNumber", user.MobileNumber);
                cmd.Parameters.AddWithValue("@Date", DateTime.Now);

                cmd.ExecuteNonQuery();
            }
        }

        return Ok("User registered successfully");
    }

    [HttpPost("login")]
    public IActionResult Login(UserLoginModel userLogin)
    {
        // Validate user credentials (you should check against the database)
        bool isValidUser = ValidateUser(userLogin.EmailId, userLogin.Password);

        if (!isValidUser)
            return BadRequest("Invalid email or password");

        // Generate JWT token
        var token = GenerateToken(userLogin.EmailId);
        return Ok(new { Token = token, EmailId = userLogin.EmailId });

        // return Ok(new { Token = token });
    }



    [HttpPost("resetpassword")]
    public IActionResult ResetPassword(ResetPasswordModel resetPassword)
    {
        // Implement password reset logic (you should validate the user's identity and update the password)
        // For simplicity, a hardcoded check is done here. In a real-world scenario, you should use a secure mechanism.
        if (resetPassword.Username == "sampleuser" && resetPassword.EmailId == "sample@example.com")
        {
            // Update the password in the database (implement this)
            // For simplicity, we're just returning a success message.
            return Ok("Password reset successfully");
        }

        return BadRequest("Invalid username or email");
    }

    private bool CheckIfUserExists(string username)
    {
        using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        {
            connection.Open();

            // Assuming your SQL query to check if the user exists based on the username
            string query = "SELECT COUNT(*) FROM [User] WHERE Username = @Username";

            using (SqlCommand cmd = new SqlCommand(query, connection))
            {
                cmd.Parameters.AddWithValue("@Username", username);

                // Execute the query and retrieve the count
                int userCount = (int)cmd.ExecuteScalar();

                // Check if the count is greater than zero, indicating the user exists
                return userCount > 0;
            }
        }
    }
    private bool ValidateUser(string EmailId, string password)
    {
        // Log received credentials
        Console.WriteLine($"Received username: {EmailId}, password: {password}");

        // Validate user credentials against the database (implement this)
        // Fetch the hashed password from the database using the username
        string hashedPasswordFromDatabase = GetHashedPassword(EmailId);

        // Log the hashed password from the database
        Console.WriteLine($"Hashed password from the database: {hashedPasswordFromDatabase}");

        // Verify the hashed password with the entered password
        bool isValid = BCrypt.Net.BCrypt.Verify(password, hashedPasswordFromDatabase);

        // Log the validation result
        Console.WriteLine($"Validation result: {isValid}");

        return isValid;
    }

    private string GetHashedPassword(string EmailId)
    {
        using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        {
            connection.Open();

            // Assuming your SQL query to get the hashed password based on the username
            string query = "SELECT Password FROM [User] WHERE EmailId = @EmailId";

            using (SqlCommand cmd = new SqlCommand(query, connection))
            {
                cmd.Parameters.AddWithValue("@EmailId", EmailId);

                // Execute the query
                var result = cmd.ExecuteScalar();

                // Check if the result is not null
                if (result != null)
                {
                    // Convert the result to a string (assuming it's stored as a string in the database)
                    return result.ToString();
                }
            }
        }

        // Return null if no matching username is found (handle this appropriately in your code)
        return null;
    }

    private string GenerateToken(string EmailId)
    {
        // Check if configuration is available
        if (_configuration == null)
        {
            throw new InvalidOperationException("Configuration is not available.");
        }

        var secretKey = _configuration["Jwt:SecretKey"];
        var issuer = _configuration["Jwt:Issuer"];
        var audience = _configuration["Jwt:Audience"];

        // Check if any of the required values is null or empty
        if (string.IsNullOrWhiteSpace(secretKey) || string.IsNullOrWhiteSpace(issuer) || string.IsNullOrWhiteSpace(audience))
        {
            // Handle the case where configuration values are missing or invalid
            throw new InvalidOperationException("JWT configuration values are missing or invalid.");
        }

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: new[] { new Claim(ClaimTypes.Name, EmailId) },
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    [HttpPut("update")]
    public IActionResult UpdateUser(UpdateUserModel updateUser)
    {
        // Validate if the user exists
        bool userExists = CheckIfUserExists(updateUser.Username);

        if (!userExists)
            return BadRequest("User not found");

        // Validate required fields and format
        var validationResults = new List<ValidationResult>();
        if (!Validator.TryValidateObject(updateUser, new ValidationContext(updateUser), validationResults, validateAllProperties: true))
            return BadRequest(validationResults.First().ErrorMessage);

        using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        {
            connection.Open();
            using (SqlCommand cmd = new SqlCommand("UPDATE [User] SET Username = @Username, MobileNumber = @MobileNumber WHERE Username = @OldUsername", connection))
            {
                cmd.Parameters.AddWithValue("@Username", updateUser.NewUsername);
                cmd.Parameters.AddWithValue("@MobileNumber", updateUser.NewMobileNumber);
                cmd.Parameters.AddWithValue("@OldUsername", updateUser.Username);

                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected > 0)
                    return Ok("User updated successfully");
                else
                    return BadRequest("Update failed");
            }
        }
    }

    //[Authorize]
    [HttpGet("getallusers")]
    public IActionResult GetAllUsers()
    {
        List<GetUserModel> users = new List<GetUserModel>();

        using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        {
            connection.Open();
            using (SqlCommand cmd = new SqlCommand("SELECT * FROM [User]", connection))
            {
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        // Map the data to GetUserModel objects
                        GetUserModel user = new GetUserModel
                        {
                            Username = reader["Username"].ToString(),
                            EmailId = reader["EmailId"].ToString(),
                            MobileNumber = reader["MobileNumber"].ToString(),
                            // You may need to convert the date format based on your requirements
                            Date = Convert.ToDateTime(reader["Date"]),
                            // Password is not included to avoid exposing sensitive information
                        };

                        users.Add(user);
                    }
                }
            }
        }

        if (users.Count > 0)
        {
            return Ok(users);
        }
        else
        {
            return NotFound("No users found");
        }
    }




}