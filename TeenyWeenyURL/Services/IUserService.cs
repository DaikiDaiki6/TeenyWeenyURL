using System;
using TeenyWeenyURL.Model.DTO;
using TeenyWeenyURL.Model.Entity;

namespace TeenyWeenyURL.Services;

public interface IUserService
{
    Task<User?> CreateUserAsync(CreateUserRequest request);
    Task<User?> EditUserAsync(EditUserRequest request, int id);
    Task<bool> DeleteUserAsync(int id);

}
