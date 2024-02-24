using Authentication_Service;
using Authentication_Service.Models;
using Authentication_Service.Repository;
using Authentication_Service.Token_Generator;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//builder.Services.AddDbContext<UserDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Mycon")));
builder.Services.AddScoped<IUserRepo, UserRepo>();
builder.Services.AddScoped<ITokenGenerator, TokenGenerator>();
builder.Services.AddScoped<Userdbcontext>();
builder.Services.AddSingleton<KafkaConsumerFactory>();
builder.Services.AddSingleton<IHostedService>(provider =>
{
    var factory = provider.GetRequiredService<KafkaConsumerFactory>();
    return factory.Create();
});
builder.Services.AddCors(op=>op.AddPolicy("Loginpolicy",plcy=>plcy.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod()));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("Loginpolicy");
app.UseAuthorization();

app.MapControllers();

app.Run();
