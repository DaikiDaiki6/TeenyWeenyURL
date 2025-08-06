using System;
using TeenyWeenyURL.Model.DTO;
using TeenyWeenyURL.Model.Entity;

namespace TeenyWeenyURL.Services;

public interface IUserService
{
    Task<UserResponse?> EditUserAsync(EditUserRequest request, int id);
    Task<bool> DeleteUserAsync(int id);
}
