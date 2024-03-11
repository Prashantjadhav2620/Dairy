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
using Microsoft.AspNetCore.Identity.Data;
using Newtonsoft.Json;
using iText.StyledXmlParser.Jsoup.Select;
using Microsoft.VisualBasic;

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
            using (SqlCommand cmd = new SqlCommand("INSERT INTO [User] (Username,User_Id, EmailId, Password, MobileNumber, Date) VALUES (@Username,@User_Id, @EmailId, @Password, @MobileNumber, @Date)", connection))
            {
                cmd.Parameters.AddWithValue("@Username", user.Username);
                cmd.Parameters.AddWithValue("@User_Id", Guid.NewGuid().ToString());
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
        var refreshToken = GenerateRefreshToken(userLogin.EmailId);
        var User_Id = UserId(userLogin.EmailId);

        string userIdAndUsername = UserNameAndId(userLogin.EmailId);

        // Extracting user ID and username
        string[] idAndUsernameArray = userIdAndUsername.Split(" - ");
        int Id = int.Parse(idAndUsernameArray[0]);
        string username = idAndUsernameArray[1];

        int expiresIn = 5 * 60; // 5 minutes in seconds
        var authenticatedUser = new UserResponse
        {
            Uid = User_Id,
            UserId=Id,
            Username = username,
            Email = userLogin.EmailId,
            EmailVerified = true,
            isAnonymous= false
        };

        // Generate dummy tokens
        var tokenResponse = new TokenResponse
        {
            IdToken ="password",
            RefreshToken = refreshToken,
            AccessToken = token,
            ExpiresIn = expiresIn
        };

        // Create the response
        var userLoginResponse = new UserLoginResponse
        {
            User = authenticatedUser,
            TokenResponse = tokenResponse,
            OperationType = "signIn"
        };

        // Serialize the response to JSON
        var jsonResponse = JsonConvert.SerializeObject(userLoginResponse);

        // Return the JSON response
        return Ok(jsonResponse);
    }

    private string UserId(string EmailId)
    {
        using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        {
            connection.Open();

            // Assuming your SQL query to get the hashed password based on the username
            string query = "SELECT User_Id FROM [User] WHERE EmailId = @EmailId";

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

        return null;
    }


    [HttpPost("resetpassword")]
    public IActionResult ResetPassword(ResetPasswordModel resetPassword)
    {
        bool emailExists = CheckEmailExists(resetPassword.EmailId);

        //This is used for caching purposes. It tells the client that the response has not been modified, so the client can continue to use the same cached version of the response.
        if (!emailExists)
            return NotFound("Email id does not exist");

        SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Dairy"));

        try
        {
            connection.Open();

            // Hash the new password before updating the database
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(resetPassword.Password);

            // SQL UPDATE statement to update the password
            string updateQuery = @"UPDATE [User]
                               SET [Password] = @Password
                               WHERE [EmailId] = @EmailId";

            using (SqlCommand cmd = new SqlCommand(updateQuery, connection))
            {
                // Parameters to prevent SQL injection
                cmd.Parameters.AddWithValue("@Password", hashedPassword);
                cmd.Parameters.AddWithValue("@EmailId", resetPassword.EmailId);

                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected > 0)
                {
                    // Password updated successfully
                    return Ok("Password reset successfully");
                }
                else
                {
                    // No rows affected means user not found by email, return BadRequest
                    return BadRequest("Invalid username or email");
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.ToString());
            return StatusCode(500, "Internal Server Error");
        }
        finally
        {
            connection.Close();
        }
    }

    private bool CheckEmailExists(string Email)
    {
        int userCount = 0;
        using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        {
            connection.Open();
            try
            {
                // Assuming your SQL query to check if the user exists based on the username
                string query = "SELECT COUNT(*) FROM [User] WHERE EmailId = @Email";

                using (SqlCommand cmd = new SqlCommand(query, connection))
                {
                    cmd.Parameters.AddWithValue("@Email", Email);

                    // Execute the query and retrieve the count
                    userCount = (int)cmd.ExecuteScalar();

                    // Check if the count is greater than zero, indicating the user exists
                    return userCount > 0;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("failded", ex.Message);
            }

        }
        return userCount > 0;
    }

    private bool CheckIfUserExists(string username)
    {
        int userCount = 0;
        using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        {
            connection.Open();
            try
            {
                // Assuming your SQL query to check if the user exists based on the username
                string query = "SELECT COUNT(*) FROM [User] WHERE Username = @Username";

                using (SqlCommand cmd = new SqlCommand(query, connection))
                {
                    cmd.Parameters.AddWithValue("@Username", username);

                    // Execute the query and retrieve the count
                     userCount = (int)cmd.ExecuteScalar();

                    // Check if the count is greater than zero, indicating the user exists
                    return userCount > 0;
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine("failded",ex.Message);
            }
            
        }
        return userCount > 0;
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
    private string UserNameAndId(string EmailId)
    {
        using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Dairy")))
        {
            connection.Open();

            string query = "SELECT Id, Username FROM [User] WHERE EmailId = @EmailId";

            using (SqlCommand cmd = new SqlCommand(query, connection))
            {
                cmd.Parameters.AddWithValue("@EmailId", EmailId);

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        int userId = reader.GetInt32(0); 
                        string username = reader.GetString(1);

                        return $"{userId} - {username}";
                    }
                    else
                    {
                        return "User not found";
                    }
                }
            }
        }
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
            //expires: DateTime.Now.AddMinutes(30),
            expires: DateTime.Now.AddMinutes(5),
            signingCredentials: creds
        );

        // return new JwtSecurityTokenHandler().WriteToken(token);
        var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
        //StoreTokenInDatabase(EmailId, jwtToken);

        // Generate and return refresh token
        //var refreshToken = GenerateRefreshToken(EmailId);
        return jwtToken;
    }


    //private void StoreTokenInDatabase(string email, string token)
    //{
    //    try
    //    {
    //        using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Dairy")))
    //        {
    //            connection.Open();

    //            // Assuming your SQL query to update the access token based on the email
    //            string query = "UPDATE [User] SET AccessToken = LEFT(@accessToken, 255) WHERE Username = @email";

    //            using (SqlCommand cmd = new SqlCommand(query, connection))
    //            {
    //                cmd.Parameters.AddWithValue("@email", email);
    //                cmd.Parameters.AddWithValue("@accessToken", token);

    //                // Execute the update query
    //                cmd.ExecuteNonQuery();
    //            }
    //            connection.Close();
    //        }
    //    }
    //    catch (Exception ex)
    //    {
    //        Console.WriteLine("Failed ??",ex.Message);
    //    }

        
    //}

    private string GenerateRefreshToken(string email)
    {
        // Generate a unique refresh token (replace this with your actual logic)
        var refreshToken = Guid.NewGuid().ToString();

        // Store the refresh token in the database (replace this with your actual database logic)
        // Example: Update [YourTableName] set [RefreshToken] = refreshToken where [EmailId] = email
        // Make sure to handle database connections, commands, and exceptions properly
        //StoreRefreshTokenInDatabase(email, refreshToken);

        return refreshToken;
    }

    //private void StoreRefreshTokenInDatabase(string email, string refreshToken)
    //{
    //    using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("Dairy")))
    //    {
    //        connection.Open();

    //        // Assuming your SQL query to check if the user exists based on the username
    //        string query = "UPDATE [User] SET RefreshToken = @refreshToken WHERE Username = @email";

    //        using (SqlCommand cmd = new SqlCommand(query, connection))
    //        {
    //            cmd.Parameters.AddWithValue("@email", email);
    //            cmd.Parameters.AddWithValue("@refreshToken", refreshToken);

    //            // Execute the update query
    //            cmd.ExecuteNonQuery();
    //        }
    //    }
    //}


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
                            Id = Convert.ToInt32(reader["Id"]),
                            Username = reader["Username"].ToString(),
                            EmailId = reader["EmailId"].ToString(),
                            MobileNumber = reader["MobileNumber"].ToString(),
                            Date = Convert.ToDateTime(reader["Date"]),
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