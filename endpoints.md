# API Endpoints Reference

Base URL: `http://localhost:3333`

All protected routes require the header:
```
Authorization: Bearer <token>
```

---

## Summary

| Method | Route | Auth | Admin | Description |
| --- | --- | --- | --- | --- |
| POST | `/users` | No | No | Create user |
| POST | `/session` | No | No | Authenticate user |
| POST | `/me` | Yes | No | Get authenticated user |
| GET | `/categories` | Yes | No | List categories |
| POST | `/categories` | Yes | Yes | Create category |
| GET | `/products` | Yes | No | List products |
| POST | `/product` | Yes | Yes | Create product |
| DELETE | `/product` | Yes | Yes | Archive product |
| GET | `/category/product` | Yes | No | List products by category |
| POST | `/order` | Yes | No | Create order |
| GET | `/orders` | Yes | No | List orders |
| GET | `/order/:order_id` | Yes | No | Get order details |
| POST | `/order/:order_id/items` | Yes | No | Add item to order |
| PATCH | `/order/:order_id/send` | Yes | No | Send order to kitchen |
| PATCH | `/order/:order_id/finish` | Yes | No | Finish / close order |
| DELETE | `/order/:order_id` | Yes | No | Delete order |
| DELETE | `/items/:item_Id` | Yes | No | Remove item from order |

---

## Users

### POST /users

Creates a new user account. Role defaults to `STAFF`.

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "username": "Joao Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

| Field | Type | Rules |
| --- | --- | --- |
| `username` | string | min 3 characters |
| `email` | string | valid email format |
| `password` | string | min 6 characters |

**Response 200:**
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "Joao Silva",
  "email": "joao@example.com",
  "role": "STAFF",
  "createdAt": "2026-06-28T10:00:00.000Z"
}
```

**Errors:**
| Status | Message |
| --- | --- |
| 400 | Validation error (username/email/password invalid) |
| 400 | `Usuário já existente!` (email already in use) |

---

### POST /session

Authenticates a user and returns a JWT token.

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

| Field | Type | Rules |
| --- | --- | --- |
| `email` | string | valid email format |
| `password` | string | required |

**Response 200:**
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "Joao Silva",
  "email": "joao@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors:**
| Status | Message |
| --- | --- |
| 400 | Validation error |
| 400 | `user/password incorrect` |

---

### POST /me

Returns the data of the currently authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response 200:**
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "Joao Silva",
  "email": "joao@example.com",
  "role": "STAFF"
}
```

**Errors:**
| Status | Message |
| --- | --- |
| 401 | Token not provided or invalid |

---

## Categories

### GET /categories

Lists all categories ordered by name ascending.

**Headers:**
```
Authorization: Bearer <token>
```

**Response 200:**
```json
[
  {
    "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    "name": "Pizzas Salgadas",
    "createdAt": "2026-06-01T08:00:00.000Z"
  },
  {
    "id": "c3d4e5f6-a7b8-9012-cdef-123456789012",
    "name": "Pizzas Doces",
    "createdAt": "2026-06-01T08:05:00.000Z"
  }
]
```

**Errors:**
| Status | Message |
| --- | --- |
| 401 | Token not provided or invalid |

---

### POST /categories

Creates a new product category. Requires ADMIN role.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Pizzas Doces"
}
```

| Field | Type | Rules |
| --- | --- | --- |
| `name` | string | min 2 characters |

**Response 201:**
```json
{
  "id": "c3d4e5f6-a7b8-9012-cdef-123456789012",
  "name": "Pizzas Doces",
  "createdAt": "2026-06-28T10:00:00.000Z"
}
```

**Errors:**
| Status | Message |
| --- | --- |
| 400 | Validation error |
| 400 | `unable to create category` (name already exists) |
| 401 | Token not provided or invalid |
| 401 | Unauthorized (not ADMIN) |

---

## Products

### GET /products

Lists all products. Use `disabled=true` to list archived products; defaults to active products.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Params:**
| Param | Type | Default | Description |
| --- | --- | --- | --- |
| `disabled` | string | `"false"` | `"true"` to list archived products |

**Example:** `GET /products?disabled=false`

**Response 200:**
```json
[
  {
    "id": "d4e5f6a7-b8c9-0123-defa-234567890123",
    "name": "Calabresa",
    "price": 1599,
    "description": "Molho, mussarela, calabresa e oregano",
    "banner": "https://res.cloudinary.com/demo/image/upload/v1/products/calabresa.jpg",
    "disabled": false,
    "category_id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    "createdAt": "2026-06-10T09:00:00.000Z",
    "category": {
      "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "name": "Pizzas Salgadas"
    }
  }
]
```

**Errors:**
| Status | Message |
| --- | --- |
| 401 | Token not provided or invalid |

---

### POST /product

Creates a new product with an image uploaded to Cloudinary. Requires ADMIN role.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form-data fields:**
| Field | Type | Rules |
| --- | --- | --- |
| `file` | File | Required. JPEG or PNG, max 4 MB |
| `name` | string | min 1 character |
| `price` | string | digits only, value in cents (e.g. `"1599"` = R$15,99) |
| `description` | string | min 1 character |
| `category_id` | string | valid UUID of an existing category |

**Response 200:**
```json
{
  "id": "d4e5f6a7-b8c9-0123-defa-234567890123",
  "name": "Calabresa",
  "price": 1599,
  "description": "Molho, mussarela, calabresa e oregano",
  "category_id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
  "banner": "https://res.cloudinary.com/demo/image/upload/v1/products/calabresa.jpg",
  "createdAt": "2026-06-28T10:00:00.000Z"
}
```

**Errors:**
| Status | Message |
| --- | --- |
| 400 | Validation error (name/price/description/category_id) |
| 400 | `Category not found` |
| 400 | `A product with this name already exists!` |
| 400 | `The product image is required` |
| 400 | `Error while uploading image` |
| 401 | Token not provided or invalid |
| 401 | Unauthorized (not ADMIN) |

---

### DELETE /product

Archives a product by setting `disabled = true`. The product is not physically deleted — existing order history is preserved. Requires ADMIN role.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Params:**
| Param | Type | Required | Description |
| --- | --- | --- | --- |
| `product_id` | string (UUID) | Yes | ID of the product to archive |

**Example:** `DELETE /product?product_id=d4e5f6a7-b8c9-0123-defa-234567890123`

**Response 200:**
```json
{
  "message": "Product sucessfully deleted/archived"
}
```

**Errors:**
| Status | Message |
| --- | --- |
| 400 | `Falha ao deletar o produto` (product not found) |
| 401 | Token not provided or invalid |
| 401 | Unauthorized (not ADMIN) |

---

### GET /category/product

Lists all active (non-disabled) products belonging to a specific category.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Params:**
| Param | Type | Required | Description |
| --- | --- | --- | --- |
| `category_id` | string (UUID) | Yes | ID of the category |

**Example:** `GET /category/product?category_id=b2c3d4e5-f6a7-8901-bcde-f12345678901`

**Response 200:**
```json
[
  {
    "id": "d4e5f6a7-b8c9-0123-defa-234567890123",
    "name": "Calabresa",
    "price": 1599,
    "description": "Molho, mussarela, calabresa e oregano",
    "banner": "https://res.cloudinary.com/demo/image/upload/v1/products/calabresa.jpg",
    "disabled": false,
    "category_id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    "createdAt": "2026-06-10T09:00:00.000Z",
    "category": {
      "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "name": "Pizzas Salgadas"
    }
  }
]
```

**Errors:**
| Status | Message |
| --- | --- |
| 400 | `Category not found!` |
| 401 | Token not provided or invalid |

---

## Orders

### Order lifecycle

```
[Created] draft=true, status=false
     │
     │  POST /order/:id/items  (add items)
     │
     ▼
[Sent]    draft=false, status=false   ←  PATCH /order/:id/send
     │
     ▼
[Finished] draft=false, status=true  ←  PATCH /order/:id/finish
```

---

### POST /order

Creates a new order in draft mode (`draft = true`, `status = false`).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "table": 5,
  "name": "Mesa do João"
}
```

| Field | Type | Rules |
| --- | --- | --- |
| `table` | number | positive integer |
| `name` | string | min 1 character |

**Response 201:**
```json
{
  "id": "e5f6a7b8-c9d0-1234-efab-345678901234",
  "table": 5,
  "name": "Mesa do João",
  "status": false,
  "draft": true,
  "createdAt": "2026-06-28T12:00:00.000Z"
}
```

**Errors:**
| Status | Message |
| --- | --- |
| 400 | Validation error (table/name invalid) |
| 401 | Token not provided or invalid |

---

### GET /orders

Lists orders filtered by draft status. By default returns non-draft orders (`draft=false`).

**Headers:**
```
Authorization: Bearer <token>
```

**Query Params:**
| Param | Type | Default | Description |
| --- | --- | --- | --- |
| `draft` | string | `"false"` | `"true"` to list draft orders |

**Example:** `GET /orders?draft=true`

**Response 200:**
```json
[
  {
    "id": "e5f6a7b8-c9d0-1234-efab-345678901234",
    "table": 5,
    "name": "Mesa do João",
    "draft": true,
    "status": false,
    "createdAt": "2026-06-28T12:00:00.000Z",
    "items": [
      {
        "id": "f6a7b8c9-d0e1-2345-fabc-456789012345",
        "amount": 2,
        "product": {
          "id": "d4e5f6a7-b8c9-0123-defa-234567890123",
          "name": "Calabresa",
          "price": 1599,
          "description": "Molho, mussarela, calabresa e oregano",
          "banner": "https://res.cloudinary.com/demo/image/upload/v1/products/calabresa.jpg"
        }
      }
    ]
  }
]
```

**Errors:**
| Status | Message |
| --- | --- |
| 401 | Token not provided or invalid |

---

### GET /order/:order_id

Returns full details of a specific order, including all items and their products.

**Headers:**
```
Authorization: Bearer <token>
```

**Path Params:**
| Param | Type | Description |
| --- | --- | --- |
| `order_id` | UUID | ID of the order |

**Example:** `GET /order/e5f6a7b8-c9d0-1234-efab-345678901234`

**Response 200:**
```json
{
  "id": "e5f6a7b8-c9d0-1234-efab-345678901234",
  "table": 5,
  "name": "Mesa do João",
  "draft": true,
  "status": false,
  "createdAt": "2026-06-28T12:00:00.000Z",
  "updatedAt": "2026-06-28T12:05:00.000Z",
  "items": [
    {
      "id": "f6a7b8c9-d0e1-2345-fabc-456789012345",
      "amount": 2,
      "total": 3198,
      "createdAt": "2026-06-28T12:02:00.000Z",
      "product": {
        "id": "d4e5f6a7-b8c9-0123-defa-234567890123",
        "name": "Calabresa",
        "price": 1599,
        "description": "Molho, mussarela, calabresa e oregano",
        "banner": "https://res.cloudinary.com/demo/image/upload/v1/products/calabresa.jpg"
      }
    }
  ]
}
```

**Errors:**
| Status | Message |
| --- | --- |
| 400 | `Order not found` |
| 401 | Token not provided or invalid |

---

### POST /order/:order_id/items

Adds an item to an existing order. The `total` is calculated as `price * amount` and stored.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Path Params:**
| Param | Type | Description |
| --- | --- | --- |
| `order_id` | UUID | ID of the order |

**Body:**
```json
{
  "product_id": "d4e5f6a7-b8c9-0123-defa-234567890123",
  "amount": 2
}
```

| Field | Type | Rules |
| --- | --- | --- |
| `product_id` | UUID | must be an active (non-disabled) product |
| `amount` | number | positive integer |

**Response 200:**
```json
{
  "id": "f6a7b8c9-d0e1-2345-fabc-456789012345",
  "amount": 2,
  "order_id": "e5f6a7b8-c9d0-1234-efab-345678901234",
  "product_id": "d4e5f6a7-b8c9-0123-defa-234567890123",
  "createdAt": "2026-06-28T12:02:00.000Z",
  "product": {
    "id": "d4e5f6a7-b8c9-0123-defa-234567890123",
    "name": "Calabresa",
    "price": 1599,
    "description": "Molho, mussarela, calabresa e oregano",
    "banner": "https://res.cloudinary.com/demo/image/upload/v1/products/calabresa.jpg"
  }
}
```

**Errors:**
| Status | Message |
| --- | --- |
| 400 | Validation error (product_id/amount/order_id) |
| 400 | `Order not found` |
| 400 | `product not found` (product does not exist or is disabled) |
| 400 | `Unable to add item to order` |
| 401 | Token not provided or invalid |

---

### PATCH /order/:order_id/send

Sends the order to the kitchen, transitioning it from draft to active (`draft = false`). Cannot be called on an order that was already sent.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Path Params:**
| Param | Type | Description |
| --- | --- | --- |
| `order_id` | UUID | ID of the order |

**Body (optional):**
```json
{
  "name": "Mesa do João"
}
```

| Field | Type | Rules |
| --- | --- | --- |
| `name` | string | optional, updates the order name |

**Response 200:**
```json
{
  "id": "e5f6a7b8-c9d0-1234-efab-345678901234",
  "table": 5,
  "name": "Mesa do João",
  "draft": false,
  "status": false,
  "createdAt": "2026-06-28T12:00:00.000Z"
}
```

**Errors:**
| Status | Message |
| --- | --- |
| 400 | `Order not found` |
| 400 | `this order has already been sent` |
| 400 | `unable to send order` |
| 401 | Token not provided or invalid |

---

### PATCH /order/:order_id/finish

Closes the order, marking it as finished (`status = true`). Cannot be called on an already finished order.

**Headers:**
```
Authorization: Bearer <token>
```

**Path Params:**
| Param | Type | Description |
| --- | --- | --- |
| `order_id` | UUID | ID of the order |

**Response 200:**
```json
{
  "id": "e5f6a7b8-c9d0-1234-efab-345678901234",
  "table": 5,
  "name": "Mesa do João",
  "draft": false,
  "status": true,
  "createdAt": "2026-06-28T12:00:00.000Z"
}
```

**Errors:**
| Status | Message |
| --- | --- |
| 400 | `Order not found` |
| 400 | `this order has already been finished` |
| 400 | `unable to finish order` |
| 401 | Token not provided or invalid |

---

### DELETE /order/:order_id

Permanently deletes an order and all its items (cascade delete).

**Headers:**
```
Authorization: Bearer <token>
```

**Path Params:**
| Param | Type | Description |
| --- | --- | --- |
| `order_id` | UUID | ID of the order |

**Example:** `DELETE /order/e5f6a7b8-c9d0-1234-efab-345678901234`

**Response 204:**
```json
{
  "message": "order deleted sucessfully"
}
```

**Errors:**
| Status | Message |
| --- | --- |
| 400 | `Order not found` |
| 400 | `unable to delete order` |
| 401 | Token not provided or invalid |

---

### DELETE /items/:item_Id

Removes a single item from an order.

**Headers:**
```
Authorization: Bearer <token>
```

**Path Params:**
| Param | Type | Description |
| --- | --- | --- |
| `item_Id` | UUID | ID of the item to remove |

**Example:** `DELETE /items/f6a7b8c9-d0e1-2345-fabc-456789012345`

**Response 200:**
```json
{
  "message": "Item successfully deleted"
}
```

**Errors:**
| Status | Message |
| --- | --- |
| 400 | `Item not found` |
| 401 | Token not provided or invalid |

---

## Error Response Format

All errors follow this format:

```json
{
  "error": "Error message here"
}
```

Validation errors (400) from `validateSchema` include field-level detail:

```json
{
  "error": "Erro validação",
  "details": [
    { "message": "username needs to be at least 3 digits long" },
    { "message": "Needs to be a valid email" }
  ]
}
```

---

*Last updated: 2026-06-28 | Project version: 1.3.0*
