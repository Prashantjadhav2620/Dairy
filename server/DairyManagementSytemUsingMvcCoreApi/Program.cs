using DAL.Services.Interface;
using DAL.Services.Implimentation;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors(option =>
{
    option.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});
builder.Services.AddTransient<IStateServices, StateServices>();
builder.Services.AddTransient<IStateLocation, StateLocationServices>();
builder.Services.AddTransient<ICityServices, CityServices>();
builder.Services.AddTransient<ILocationServices, LocationServices>();
builder.Services.AddTransient<IProductServices, ProductServices>();
builder.Services.AddTransient<IDelivaryRootsServices, DelivaryRootsServices>();
builder.Services.AddTransient<IDelivaryBoysServices, DelivaryBoysServices>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors();
app.MapControllers();

app.Run();
