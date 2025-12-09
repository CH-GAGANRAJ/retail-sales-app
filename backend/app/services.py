from app.models import Sale
from sqlalchemy import or_, and_, func
from datetime import datetime

class SalesService:
    
    @staticmethod
    def get_sales(
        page=1,
        per_page=10,
        search=None,
        customer_region=None,
        gender=None,
        min_age=None,
        max_age=None,
        product_category=None,
        tags=None,
        payment_method=None,
        start_date=None,
        end_date=None,
        sort_by='date',
        sort_order='desc'
    ):
        query = Sale.query
        
        # Apply search
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                or_(
                    Sale.customer_name.ilike(search_term),
                    Sale.phone_number.ilike(search_term)
                )
            )
        
        # Apply filters
        if customer_region:
            regions = customer_region.split(',')
            query = query.filter(Sale.customer_region.in_(regions))
        
        if gender:
            genders = gender.split(',')
            query = query.filter(Sale.gender.in_(genders))
        
        if min_age:
            query = query.filter(Sale.age >= int(min_age))
        
        if max_age:
            query = query.filter(Sale.age <= int(max_age))
        
        if product_category:
            categories = product_category.split(',')
            query = query.filter(Sale.product_category.in_(categories))
        
        if tags:
            tag_list = tags.split(',')
            conditions = [Sale.tags.ilike(f"%{tag}%") for tag in tag_list]
            query = query.filter(or_(*conditions))
        
        if payment_method:
            methods = payment_method.split(',')
            query = query.filter(Sale.payment_method.in_(methods))
        
        if start_date:
            query = query.filter(Sale.date >= datetime.strptime(start_date, '%Y-%m-%d').date())
        
        if end_date:
            query = query.filter(Sale.date <= datetime.strptime(end_date, '%Y-%m-%d').date())
        
        # Apply sorting
        sort_column = {
            'date': Sale.date,
            'quantity': Sale.quantity,
            'customerName': Sale.customer_name,
            'totalAmount': Sale.total_amount
        }.get(sort_by, Sale.date)
        
        if sort_order == 'desc':
            query = query.order_by(sort_column.desc())
        else:
            query = query.order_by(sort_column.asc())
        
        # Get total count before pagination
        total = query.count()
        
        # Apply pagination
        pagination = query.paginate(page=page, per_page=per_page, error_out=False)
        
        return {
            'sales': [sale.to_dict() for sale in pagination.items],
            'total': total,
            'page': page,
            'per_page': per_page,
            'pages': pagination.pages
        }
    
    @staticmethod
    def get_filter_options():
        return {
            'customerRegions': [r[0] for r in Sale.query.with_entities(Sale.customer_region).distinct().all() if r[0]],
            'genders': [g[0] for g in Sale.query.with_entities(Sale.gender).distinct().all() if g[0]],
            'productCategories': [c[0] for c in Sale.query.with_entities(Sale.product_category).distinct().all() if c[0]],
            'paymentMethods': [p[0] for p in Sale.query.with_entities(Sale.payment_method).distinct().all() if p[0]],
            'ageRange': {
                'min': Sale.query.with_entities(func.min(Sale.age)).scalar() or 0,
                'max': Sale.query.with_entities(func.max(Sale.age)).scalar() or 100
            },
            'tags': list(set(
                tag.strip() 
                for row in Sale.query.with_entities(Sale.tags).all() 
                if row[0]
                for tag in row[0].split(',')
            ))
        }