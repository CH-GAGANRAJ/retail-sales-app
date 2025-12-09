from app import db
from datetime import datetime

class Sale(db.Model):
    __tablename__ = 'sales'
    
    id = db.Column(db.Integer, primary_key=True)
    transaction_id = db.Column(db.String(50), nullable=False, index=True)
    date = db.Column(db.Date, nullable=False, index=True)
    
    # Customer fields
    customer_id = db.Column(db.String(50), nullable=False, index=True)
    customer_name = db.Column(db.String(100), nullable=False, index=True)
    phone_number = db.Column(db.String(20))
    gender = db.Column(db.String(20), index=True)
    age = db.Column(db.Integer, index=True)
    customer_region = db.Column(db.String(50), index=True)
    customer_type = db.Column(db.String(50))
    
    # Product fields
    product_id = db.Column(db.String(50), index=True)
    product_name = db.Column(db.String(200))
    brand = db.Column(db.String(100))
    product_category = db.Column(db.String(100), index=True)
    tags = db.Column(db.String(200))
    
    # Sales fields
    quantity = db.Column(db.Integer, nullable=False)
    price_per_unit = db.Column(db.Numeric(10, 2))
    discount_percentage = db.Column(db.Numeric(5, 2))
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    final_amount = db.Column(db.Numeric(10, 2), nullable=False)
    
    # Operational fields
    payment_method = db.Column(db.String(50), index=True)
    order_status = db.Column(db.String(50))
    delivery_type = db.Column(db.String(50))
    store_id = db.Column(db.String(50))
    store_location = db.Column(db.String(100))
    salesperson_id = db.Column(db.String(50))
    employee_name = db.Column(db.String(100))
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'transactionId': self.transaction_id,
            'date': self.date.isoformat() if self.date else None,
            'customerId': self.customer_id,
            'customerName': self.customer_name,
            'phoneNumber': self.phone_number,
            'gender': self.gender,
            'age': self.age,
            'customerRegion': self.customer_region,
            'customerType': self.customer_type,
            'productId': self.product_id,
            'productName': self.product_name,
            'brand': self.brand,
            'productCategory': self.product_category,
            'tags': self.tags,
            'quantity': self.quantity,
            'pricePerUnit': float(self.price_per_unit) if self.price_per_unit else None,
            'discountPercentage': float(self.discount_percentage) if self.discount_percentage else None,
            'totalAmount': float(self.total_amount) if self.total_amount else None,
            'finalAmount': float(self.final_amount) if self.final_amount else None,
            'paymentMethod': self.payment_method,
            'orderStatus': self.order_status,
            'deliveryType': self.delivery_type,
            'storeId': self.store_id,
            'storeLocation': self.store_location,
            'salespersonId': self.salesperson_id,
            'employeeName': self.employee_name
        }