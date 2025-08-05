using System;
using TeenyWeenyURL.Model.DTO;
using TeenyWeenyURL.Model.Entity;

namespace TeenyWeenyURL.Services;

public interface IUserService
{
    Task<User> CreateUser(CreateUserRequest request);
}
