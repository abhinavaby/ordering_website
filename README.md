# FeastHub – Premium Food Ordering Website

A modern, responsive food ordering web application built with vanilla JavaScript, HTML, and CSS.

## Features

- 🎨 Beautiful, responsive UI with smooth animations
- 🛒 Shopping cart with local storage persistence
- 📧 Order confirmation via EmailJS
- 🎯 Product detail pages with ingredient lists
- 📱 Mobile-friendly design
- ⚡ Fast performance with no dependencies

## Project Structure

```
├── index.html        # Main product listing page
├── product.html      # Product detail page
├── app.js            # Main app logic and product data
├── cart.js           # Shopping cart functionality
├── product.js        # Product detail page logic
├── styles.css        # Global styles and responsive design
├── images/           # Product images
└── README.md         # This file
```

## Setup Instructions

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- An EmailJS account (for order notifications)

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ordering-site
   ```

2. **Configure EmailJS** (Optional - for order emails)
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Create a service and email template
   - Update the credentials in `cart.js`:
     - `EMAILJS_PUBLIC_KEY`
     - `EMAILJS_SERVICE_ID`
     - `EMAILJS_TEMPLATE_ID`

3. **Open in Browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     python3 -m http.server 8000
     # Then visit http://localhost:8000
     ```

## Usage

1. **Browse Products**: View the product grid on the home page
2. **View Details**: Click on any product to see full details and ingredients
3. **Add to Cart**: Use the cart button to add items (quantity adjustable)
4. **Checkout**: Fill in your information and place an order
5. **Confirmation**: Receive order confirmation email

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties and animations
- **Vanilla JavaScript** - No frameworks or build tools required
- **LocalStorage API** - Client-side cart persistence
- **EmailJS** - Email notifications

## Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Shopping cart with add/remove/quantity update
- ✅ Product filtering and search
- ✅ User profile management
- ✅ Order confirmation emails
- ✅ Smooth animations and transitions

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

Feel free to fork this project and submit pull requests for improvements.

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue in the GitHub repository.

---

**Built with ❤️ using Vanilla JavaScript**
