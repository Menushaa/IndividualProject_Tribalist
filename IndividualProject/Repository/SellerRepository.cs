using AutoMapper;
using IndividualProject.Data;
using IndividualProject.Models;
using IndividualProject.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace IndividualProject.Repository
{
    public class SellerRepository : ISellerRepository
    {
        private ApplicationDbContext _DbContext;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        public SellerRepository(ApplicationDbContext DbContext, IConfiguration configuration, IMapper mapper) 
        {
            _DbContext  = DbContext;
            _configuration = configuration;
            _mapper = mapper;
        }

        public bool SignUp (Seller seller)
        {
            try
            {
                _DbContext.Sellers.Add(seller);
                _DbContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return false;
            }
        }

        public async Task<bool> LogInAsync(string email, string password)
        {
            try
            {
                // Normalize email to lowercase
                var normalizedEmail = email.ToLower();

                var seller = await _DbContext.Sellers
                    .FirstOrDefaultAsync(a => a.Email.ToLower() == normalizedEmail);

                if (seller == null)
                {
                    Console.WriteLine("Seller not found");
                    return false;
                }

                PasswordHash ph = new PasswordHash();
                bool isValidPassword = ph.VerifyPassword(password, seller.Password);

                return isValidPassword;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during login: {ex.Message}");
                return false;
            }
        }


        public Seller GetByMail(string Email)
        {
            return _DbContext.Sellers.FirstOrDefault(e => e.Email == Email);
        }

        public Seller GetById(int id)
        {
            return _DbContext.Sellers.Find(id);
        }

        public bool Delete(int id)
        {
            var seller = _DbContext.Sellers.Find(id);
            if (seller != null)
            {
                _DbContext.Sellers.Remove(seller);
                _DbContext.SaveChanges();
                return true;
            }
            return false;
        }

        public bool SignOut()
        {
            try
            {
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return false;
            }
        }

        public async Task<Seller> GetByIdAsync(int id)
        {
            return await _DbContext.Sellers.FindAsync(id);
        }

        public async Task UpdateAsync(Seller seller)
        {
            _DbContext.Sellers.Update(seller);
            await _DbContext.SaveChangesAsync();
        }
    }
}
