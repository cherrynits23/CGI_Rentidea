using Registration_Service.Models;
using Registration_Service.Repository;
using Registration_Service.ServiceRepo;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<DataContext>();
builder.Services.AddScoped<IRepouser, Repouser>();
builder.Services.AddScoped<IServiceRepo, ServiceRepo>();

builder.Services.AddCors(op => op.AddPolicy("Userpolicy", plcy => plcy.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod()));
var app = builder.Build();
app.UseCors("Userpolicy");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
//app.UseCors("Userpolicy");
app.UseAuthorization();

app.MapControllers();

app.Run();
