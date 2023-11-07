import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api/apiSlice";

const contactsAdaptor = createEntityAdapter({});

const initialState = contactsAdaptor.getInitialState();

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({
        url: "/contacts",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedContacts = responseData.map((contact) => {
          contact.id = contact._id;
          return contact;
        });
        return contactsAdaptor.setAll(initialState, loadedContacts);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Contact", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Contact", id })),
          ];
        } else return [{ type: "Contact", id: "LIST" }];
      },
    }),
    addNewContact: builder.mutation({
      query: (initialContact) => ({
        url: "/contacts",
        method: "POST",
        body: {
          ...initialContact,
        },
      }),
      invalidatesTags: [{ type: "Contact", id: "LIST" }],
    }),
    updateContact: builder.mutation({
      query: (initialContact) => ({
        url: "/contacts",
        method: "PATCH",
        body: {
          ...initialContact,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Contact", id: arg.id },
      ],
    }),
    deleteContact: builder.mutation({
      query: ({ id }) => ({
        url: `/contacts`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Contact", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddNewContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApiSlice;

// returns the query result object
export const selectContactResults =
  contactApiSlice.endpoints.getContacts.select();

// creates memoized selector
const selectContactsData = createSelector(
  selectContactResults,
  (contactResults) => contactResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllContacts,
  selectById: selectContactById,
  selectIds: selectContactIds,
  // Pass in a selector that returns the notes slice of state
} = contactsAdaptor.getSelectors(
  (state) => selectContactsData(state) ?? initialState
);
