import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push('/orders'),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);
  if (order.status === 'complete') {
    return (
      <div>
        <h1>
          Order <small>{order.id}</small>
          <hr />
          {order.ticket.title} ${order.ticket.price}
        </h1>
        <h3>order have been paid</h3>
      </div>
    );
  }

  if (timeLeft < 0) {
    return <div> Order expired</div>;
  }

  return (
    <div>
      <h1>
        Order <small>{order.id}</small>
        <hr />
        {order.ticket.title} ${order.ticket.price}
      </h1>
      <h3>Time left to pay:{timeLeft} seconds</h3>
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51LAUkkJLIyGNwpx9RTSQ6ly0NmQn3cbqQnFr66KJ0UQiNV3uIhL1v38AG1OHsmvQwvPxcT840jETi7HjF9WH3SFY002YHuw9VW"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};
OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
};
export default OrderShow;
