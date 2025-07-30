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

        public bool LogIn(string Email, string Password)
        {
            try
            {
                var seller = _DbContext.Sellers.FirstOrDefault(a => a.Email == Email);
                if (seller == null)
                {
                    Console.WriteLine("Artist Not Found");
                    return false;
                }

                PasswordHash ph = new PasswordHash();
                bool isValidPassword = ph.VerifyPassword(Password, seller.Password);
                return isValidPassword;
            }
            catch (InvalidCastException ex)
            {
                Console.WriteLine($"InvalidCastException: {ex.Message}");
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General exception: {ex.Message}");
                throw;
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
