import { api } from "../../api/apiSlice";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({

    // products categories
    getCategories: builder.query({
      query: () => `/categories/show/cate`,
      providesTags: ["category"],
    }),

    // add product
    postProduct: builder.mutation({
      query: ({ data }) => ({
        url: `/products/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),

    // get all products
    getProducts: builder.query({
      query: () => `/products/show/product`,
      providesTags: ["products"],
    }),

    // get all products by category
    getProductsByCate: builder.query({
      query: (cateId) => `/products/category/${cateId}`,
    }),

    // get all products by store
    getProductsByStore: builder.query({
      query: (storeId) => `/products/store/${storeId}`,
    }),

    // get product by id
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["products"],
    }),
  }),
});

export const {
  // categories
  useGetCategoriesQuery,

  // products
  usePostProductMutation,
  useGetProductsQuery,
  useGetProductsByCateQuery,
  useGetProductsByStoreQuery,
  useGetProductByIdQuery
} = productApi;
