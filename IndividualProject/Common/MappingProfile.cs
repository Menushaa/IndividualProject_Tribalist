using AutoMapper;
using IndividualProject.DTO;
using IndividualProject.Models;

namespace IndividualProject.Common
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Seller, SellerRegistrationDto>().ReverseMap();
            CreateMap<Seller, LoginRequestDto>().ReverseMap();
            CreateMap<Seller, UpdateSellerDto>().ReverseMap();

            CreateMap<Item, AllitemDto>().ReverseMap();
            CreateMap<Item, CreateItemDto>().ReverseMap();

            CreateMap<Review, CreateReviewDto>().ReverseMap();
            CreateMap<Review, ReviewDto>().ReverseMap();

            CreateMap<Customer,CustomerRegistrationDto>().ReverseMap();

            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Category,CreateCategoryDto>().ReverseMap();
            CreateMap<Category, UpdateCategoryDto>().ReverseMap();
        }
    }
}
