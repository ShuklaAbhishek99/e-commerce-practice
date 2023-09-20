const buyButton = document.getElementById('buy-btn');

async function makeOrder(amount) {
    try {
        const response = await axios({
            method: 'post',
            url: '/order',
            data: { amount },
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
        });
        const { order } = response.data;

        const options = {
            "key": "rzp_test_FLCiMdvZfBytgX", // Enter the Key ID generated from the Dashboard
            "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Shopping Kart",
            "description": "Test Transaction",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI0HGPxoxSsHWi-I4xN3uxEU4cD0q0bNDeYw&usqp=CAU",
            "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "http://localhost:5000/payment-verify",
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const rzp1 = new Razorpay(options);
        rzp1.open(); 

    }
    catch (e) {
        window.location.replace('/login');
    }
}

buyButton.addEventListener('click', (e) => {
    const amount = document.querySelector('#product-price').innerText.split(' ').pop();
    makeOrder(amount);
})