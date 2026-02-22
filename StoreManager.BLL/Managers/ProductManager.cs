using StoreManager.BLL.Dtos;
using StoreManager.DAL.Repository;
using StoreManager.Modals;
using System;
using System.Collections.Generic;
using System.Linq;

namespace StoreManager.BLL.Managers
{
    public class ProductManager : IProductManager
    {
        private readonly IProductRepository _prodRepository;

        public ProductManager(IProductRepository prodRepository)
        {
            _prodRepository = prodRepository;
        }

        public string? Add(ProductAddDto product)
        {
            var existingProduct = _prodRepository.GetByCode(product.Code);
            if (existingProduct != null)
            {
                return "Product code already exists!";
            }

            var prodModel = new Products
            {
                Name = product.Name,
                Category = product.Category,
                Code = product.Code,
                ActualPrice = product.ActualPrice,
                Amount = product.Amount,
                SellPrice = product.SellPrice,
                IsDeleted = false,
            };

            _prodRepository.Add(prodModel);
            _prodRepository.SaveChanges();
            return null;
        }

        public void Delete(int Id)
        {
            var prodModel = _prodRepository.GetById(Id);

            if (prodModel != null)
            {
                prodModel.IsDeleted = true;
                prodModel.Amount = 0;
                prodModel.Code = $"{prodModel.Code}_deleted_{DateTime.Now.Ticks}";

                _prodRepository.Update(prodModel);
                _prodRepository.SaveChanges();
            }
        }

        public IEnumerable<ProductReadDto> GetAll()
        {
            var prodModels = _prodRepository.GetAll();
            var activeProducts = prodModels.Where(p => p.IsDeleted == false);

            return activeProducts.Select(a => new ProductReadDto
            {
                Id = a.Id,
                Name = a.Name,
                ActualPrice = a.ActualPrice,
                SellPrice = a.SellPrice,
                Amount = a.Amount,
                Category = a.Category,
                Code = a.Code,
            }).ToList();
        }

        public ProductReadDto GetByCode(string code)
        {
            var prodModel = _prodRepository.GetByCode(code);
            if (prodModel == null) return null;

            return new ProductReadDto
            {
                Id = prodModel.Id,
                Name = prodModel.Name,
                ActualPrice = prodModel.ActualPrice,
                SellPrice = prodModel.SellPrice,
                Amount = prodModel.Amount,
                Category = prodModel.Category,
                Code = prodModel.Code,
            };
        }

        public ProductReadDto GetById(int id)
        {
            var prodModel = _prodRepository.GetById(id);
            if (prodModel == null) return null;

            return new ProductReadDto
            {
                Id = prodModel.Id,
                Name = prodModel.Name,
                ActualPrice = prodModel.ActualPrice,
                SellPrice = prodModel.SellPrice,
                Amount = prodModel.Amount,
                Category = prodModel.Category,
                Code = prodModel.Code,
            };
        }

        public void Update(ProductUpdateDto product)
        {
            var prodModel = _prodRepository.GetById(product.Id);
            if (prodModel == null) return; 

            prodModel.Name = product.Name;
            prodModel.ActualPrice = product.ActualPrice;
            prodModel.SellPrice = product.SellPrice;
            prodModel.Amount = product.Amount;
            prodModel.Category = product.Category;
            prodModel.Code = product.Code;

            _prodRepository.Update(prodModel);
            _prodRepository.SaveChanges();
        }
    }
}