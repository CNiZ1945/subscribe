
const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// 민감한 정보는 환경 변수로 관리합니다
const PORTONE_API_KEY = "RObPFVlDubGFQBFf6xUo1EyQKdNq6UcwI2qxfIK06mRRlD99dRgxFJSoHXPkScNsBZj3dSdhuSoVGw7e"; // 환경 변수로 설정해야 합니다

router.post('/verify-payment', async (req, res) => {
    try {
        const { paymentId, orderId } = req.body;

        // 1. Portone 결제 상세 조회
        const paymentResponse = await fetch(
            `https://api.portone.io/payments/${paymentId}`,
            { headers: { Authorization: `PortOne ${PORTONE_API_KEY}` } },
        );

        if (!paymentResponse.ok) {
            throw new Error(`결제 조회 실패: ${await paymentResponse.text()}`);
        }

        const payment = await paymentResponse.json();

        // 2. 주문 금액과 결제 금액 비교
        // 예시로 주문 정보를 가져오는 로직입니다
        const order = await OrderService.findById(orderId);

        if (order.amount === payment.amount.total) {
            switch (payment.status) {
                case "VIRTUAL_ACCOUNT_ISSUED":
                    // 가상 계좌 발급 처리 로직
                    break;
                case "PAID":
                    // 결제 완료 처리 로직
                    break;
                default:
                    // 기타 상태 처리 로직
                    break;
            }
            res.status(200).send("결제 검증 완료");
        } else {
            res.status(400).send("결제 금액 불일치");
        }
    } catch (error) {
        console.error("결제 검증 오류:", error);
        res.status(400).send(error.message);
    }
});

module.exports = router;
