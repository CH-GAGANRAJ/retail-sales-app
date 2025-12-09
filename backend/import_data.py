import pandas as pd
from app import create_app, db
from app.models import Sale
from datetime import datetime

def import_csv_data(csv_file_path):
    """Import CSV data into PostgreSQL database"""
    app = create_app()
    
    with app.app_context():
        # Create tables
        db.create_all()
        
        # Read CSV
        print(f"Reading CSV file: {csv_file_path}")
        df = pd.read_csv(csv_file_path)
        
        # Clean column names
        df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')
        
        print(f"Found {len(df)} records")
        
        # Clear existing data (optional)
        Sale.query.delete()
        db.session.commit()
        
        # Import data in batches
        batch_size = 1000
        total_imported = 0
        
        for start in range(0, len(df), batch_size):
            end = min(start + batch_size, len(df))
            batch = df.iloc[start:end]
            
            sales = []
            for _, row in batch.iterrows():
                try:
                    sale = Sale(
                        transaction_id=str(row.get('transaction_id', '')),
                        date=pd.to_datetime(row.get('date')).date() if pd.notna(row.get('date')) else None,
                        customer_id=str(row.get('customer_id', '')),
                        customer_name=str(row.get('customer_name', '')),
                        phone_number=str(row.get('phone_number', '')),
                        gender=str(row.get('gender', '')),
                        age=int(row.get('age', 0)) if pd.notna(row.get('age')) else None,
                        customer_region=str(row.get('customer_region', '')),
                        customer_type=str(row.get('customer_type', '')),
                        product_id=str(row.get('product_id', '')),
                        product_name=str(row.get('product_name', '')),
                        brand=str(row.get('brand', '')),
                        product_category=str(row.get('product_category', '')),
                        tags=str(row.get('tags', '')),
                        quantity=int(row.get('quantity', 0)) if pd.notna(row.get('quantity')) else 0,
                        price_per_unit=float(row.get('price_per_unit', 0)) if pd.notna(row.get('price_per_unit')) else None,
                        discount_percentage=float(row.get('discount_percentage', 0)) if pd.notna(row.get('discount_percentage')) else None,
                        total_amount=float(row.get('total_amount', 0)) if pd.notna(row.get('total_amount')) else 0,
                        final_amount=float(row.get('final_amount', 0)) if pd.notna(row.get('final_amount')) else 0,
                        payment_method=str(row.get('payment_method', '')),
                        order_status=str(row.get('order_status', '')),
                        delivery_type=str(row.get('delivery_type', '')),
                        store_id=str(row.get('store_id', '')),
                        store_location=str(row.get('store_location', '')),
                        salesperson_id=str(row.get('salesperson_id', '')),
                        employee_name=str(row.get('employee_name', ''))
                    )
                    sales.append(sale)
                except Exception as e:
                    print(f"Error processing row: {e}")
                    continue
            
            # Bulk insert
            db.session.bulk_save_objects(sales)
            db.session.commit()
            
            total_imported += len(sales)
            print(f"Imported {total_imported}/{len(df)} records...")
        
        print(f"✅ Successfully imported {total_imported} sales records!")

if __name__ == '__main__':
    import sys
    if len(sys.argv) < 2:
        print("Usage: python import_data.py <path_to_csv_file>")
        sys.exit(1)
    
    csv_path = sys.argv[1]
    import_csv_data(csv_path)