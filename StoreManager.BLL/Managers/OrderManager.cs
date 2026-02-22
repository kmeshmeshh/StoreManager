using StoreManager.BLL.Dtos;
using StoreManager.DAL.Repository;
using StoreManager.Modals;
using System;
using System.Collections.Generic;
using System.Linq;

namespace StoreManager.BLL.Managers
{
    public class OrderManager : IOrderManager
    {
        private readonly IOrderRepository _orderRepo;
        private readonly IProductRepository _productRepo;
        private readonly ICustomerRepository _customerRepo;

        public OrderManager(
            IOrderRepository orderRepo,
            IProductRepository productRepo,
            ICustomerRepository customerRepo)
        {
            _orderRepo = orderRepo;
            _productRepo = productRepo;
            _customerRepo = customerRepo;
        }

        public void CreateOrder(OrderAddDto orderDto)
        {
            var newOrder = new Orders
            {
                OrderDate = DateTime.Now,
                OrderItems = new List<OrderItems>(),
                TotalPrice = 0,
                Discount = orderDto.Discount
            };

            if (!string.IsNullOrEmpty(orderDto.CustomerPhone))
            {
                var existingCustomer = _customerRepo.GetByPhone(orderDto.CustomerPhone);

                if (existingCustomer != null)
                {
                    newOrder.Customer = existingCustomer;
                }
                else
                {
                    var newCustomer = new Customers
                    {
                        Name = string.IsNullOrEmpty(orderDto.CustomerName)
                            ? "عميل غير معروف"
                            : orderDto.CustomerName,
                        PhoneNumber = orderDto.CustomerPhone
                    };

                    _customerRepo.Add(newCustomer);
                    _customerRepo.SaveChanges();
                    newOrder.CustomerId = newCustomer.Id;
                }
            }

            decimal subTotal = 0;

            foreach (var itemDto in orderDto.Items)
            {
                var product = _productRepo.GetById(itemDto.ProductId);

                if (product == null)
                    throw new Exception($"Product with ID {itemDto.ProductId} not found");

                if (product.Amount < itemDto.Quantity)
                    throw new Exception($"Not enough stock for product: {product.Name}");

                var orderItem = new OrderItems
                {
                    ProductId = product.Id,
                    Quantity = itemDto.Quantity,
                    UnitPrice = product.SellPrice,
                    UnitCostPrice = product.ActualPrice
                };

                newOrder.OrderItems.Add(orderItem);

                subTotal += product.SellPrice * itemDto.Quantity;

                product.Amount -= itemDto.Quantity;
                _productRepo.Update(product);
            }

            newOrder.TotalPrice = subTotal - orderDto.Discount;
            if (newOrder.TotalPrice < 0) newOrder.TotalPrice = 0;

            _orderRepo.Add(newOrder);
        }

        public IEnumerable<OrderReadDto> GetAll()
        {
            var orders = _orderRepo.GetAll();
            return orders.Select(o => new OrderReadDto
            {
                Id = o.Id,
                OrderDate = o.OrderDate,
                TotalPrice = o.TotalPrice,
                Discount = o.Discount,
                OrderItems = o.OrderItems,
                Customer = o.Customer
            }).ToList();
        }

        public OrderReadDto GetById(int id)
        {
            var order = _orderRepo.GetByIdWithDetails(id);
            if (order == null) return null;

            return new OrderReadDto
            {
                Id = order.Id,
                OrderDate = order.OrderDate,
                TotalPrice = order.TotalPrice,
                Discount = order.Discount,
                OrderItems = order.OrderItems,
                Customer = order.Customer,
            };
        }
    }
}