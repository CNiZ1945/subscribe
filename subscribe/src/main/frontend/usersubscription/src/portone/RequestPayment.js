import axios from 'axios';
import React from 'react';
import Portone from 'portone';



async function requestPayment() {
    try {
        const response = await Portone.requestPayment({
            storeId: "store-0dd0625d-644b-470c-8885-2990eafebe23",
            channelkey: "channel-key-03fba6b1-6b6c-4005-9622-967c0eb39592",
            orderName: "희노애ROCK 구독 결제",
            totalAmount: 10000,
            currency: "CURRENCY_KRW",
            payMethod: "CARD",
        });

        if (response.code !== null) {
            console.error("결제 요청 오류:", response.message);
            return alert(response.message);
        }

        // 결제 성공 후 paymentId와 orderId를 받아온다고 가정합니다
        const paymentId = response.paymentId;
        const orderId = response.orderId;

        // 결제 정보를 서버로 전송하여 검증합니다
        const api = axios.create({
            baseURL: `https://api.portone.io/payments/${paymentId}`,
        });

        await api.post('/verify-payment', { paymentId, orderId });

        alert("결제가 성공적으로 검증되었습니다.");
    } catch (error) {
        console.error("결제 요청 오류:", error);
        alert("결제 요청이 실패했습니다.");
    }
}

const PaymentComponent = () => {
    return (
        <>
        <script src="https://cdn.portone.io/v2/browser-sdk.js"></script>
        <button onClick={requestPayment}>지금 결제하기</button>
        
        </>
    );
}

export default PaymentComponent;
