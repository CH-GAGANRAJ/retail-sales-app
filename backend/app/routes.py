from flask import Blueprint, request, jsonify
from app.services import SalesService

sales_bp = Blueprint('sales', __name__)

@sales_bp.route('/sales', methods=['GET'])
def get_sales():
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('limit', 10, type=int)
        search = request.args.get('search', '')
        customer_region = request.args.get('customerRegion', '')
        gender = request.args.get('gender', '')
        min_age = request.args.get('minAge', type=int)
        max_age = request.args.get('maxAge', type=int)
        product_category = request.args.get('productCategory', '')
        tags = request.args.get('tags', '')
        payment_method = request.args.get('paymentMethod', '')
        start_date = request.args.get('startDate', '')
        end_date = request.args.get('endDate', '')
        sort_by = request.args.get('sortBy', 'date')
        sort_order = request.args.get('sortOrder', 'desc')
        
        result = SalesService.get_sales(
            page=page,
            per_page=per_page,
            search=search,
            customer_region=customer_region,
            gender=gender,
            min_age=min_age,
            max_age=max_age,
            product_category=product_category,
            tags=tags,
            payment_method=payment_method,
            start_date=start_date,
            end_date=end_date,
            sort_by=sort_by,
            sort_order=sort_order
        )
        
        return jsonify({
            'success': True,
            'data': result['sales'],
            'pagination': {
                'currentPage': result['page'],
                'pageSize': result['per_page'],
                'totalItems': result['total'],
                'totalPages': result['pages']
            }
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@sales_bp.route('/sales/filters', methods=['GET'])
def get_filters():
    try:
        filters = SalesService.get_filter_options()
        return jsonify({
            'success': True,
            'filters': filters
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500