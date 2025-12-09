import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchSalesData = async (params) => {
  try {
    const queryParams = new URLSearchParams();

    if (params.search) queryParams.append('search', params.search);
    if (params.page) queryParams.append('page', params.page);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    if (params.customerRegion?.length > 0) {
      queryParams.append('customerRegion', params.customerRegion.join(','));
    }
    if (params.gender?.length > 0) {
      queryParams.append('gender', params.gender.join(','));
    }
    if (params.minAge) queryParams.append('minAge', params.minAge);
    if (params.maxAge) queryParams.append('maxAge', params.maxAge);
    if (params.productCategory?.length > 0) {
      queryParams.append('productCategory', params.productCategory.join(','));
    }
    if (params.tags?.length > 0) {
      queryParams.append('tags', params.tags.join(','));
    }
    if (params.paymentMethod?.length > 0) {
      queryParams.append('paymentMethod', params.paymentMethod.join(','));
    }
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);

    const response = await api.get(`/api/sales?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const fetchFilterOptions = async () => {
  try {
    const response = await api.get('/api/sales/filters');
    return response.data.filters;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};