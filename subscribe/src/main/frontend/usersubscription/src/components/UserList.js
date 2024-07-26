import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';



export default function UserList() {
    const [users, setUsers] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [cardNumber, setCardNumber] = useState('');
    const [cardCompany, setCardCompany] = useState('');



    // Axios 인스턴스를 api로 사용
    const api = axios.create({
        baseURL: 'http://localhost:8080/api',
    });

    // 사용자 리스트를 가져오는 함수
    const fetchUsers = useCallback(async () => {
        try {
            const response = await api.get('/users');
            console.log('Fetched users:', response.data);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleSubscribeClick = (id) => {
        setSelectedUserId(id);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedUserId(null);
        setCardNumber('');
        setCardCompany('');

    }

    const formatCardnumber = (number) => {
        const cleanedNumber = number.replace(/\D/g, ''); // 비숫자 문자 제거
        const matches = cleanedNumber.match(/.{1,4}/g);   // 4자리씩 나누기
        return matches ? matches.join('-') : '';        // 하이픈으로 구분하여 반환
    };

    const handleCardNumberChange = (e) => {
        const rawValue = e.target.value;
        const formattedValue = formatCardnumber(rawValue);
        setCardNumber(formattedValue);
    }




    // 구독 버튼 클릭 시 호출되는 함수
    const handleSubscribe = async (id) => {
        // console.log(`Subscribing user with ID: ${id}`);
        // try {
        //     const response = await api.post(`/users/${id}/subscribe`);
        //     const updatedUser = response.data;
        //     console.log('Updated user:', updatedUser);

        //     setUsers(users.map(user =>
        //         user.id === updatedUser.id ? updatedUser : user
        //     ));
        // } catch (error) {
        //     console.error('Error subscribing user:', error);
        // }
        if (!cardCompany) {
            alert("카드 회사를 선택해주세요");
            return;
        }

        if (!cardNumber) {
            alert("카드 번호를 입력해주세요");
            return;
        }

        if (cardNumber.replace(/-/g, '').length !== 16) {
            alert("카드 번호는 16자리여야 합니다.");
            return;
        }

        try {
            const response = await api.post(`/users/${selectedUserId}/subscribe`, { cardCompany, cardNumber })
            const updatedUser = response.data;
            console.log("Updated user:", updatedUser);

            setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));

            handleModalClose();

        }
        catch (error) {
            console.error("error subscribing user:", error);
        }

    };

    // 구독 취소 버튼 클릭 시 호출되는 함수
    const handleUnsubscribe = async (id) => {
        console.log(`Unsubscribing user with ID: ${id}`);

        const confirmUnsubscribe = window.confirm("정말로 구독을 취소하시겠습니까?");

        if (confirmUnsubscribe) {

            console.log(`Unsubscribing user with Id: ${id}`);

            try {
                const response = await api.post(`/users/${id}/unsubscribe`);
                const updatedUser = response.data;
                console.log('Updated user:', updatedUser);

                setUsers(users.map(user =>
                    user.id === updatedUser.id ? updatedUser : user
                ));
            } 
            catch (error) {
                console.error('Error unsubscribing user:', error);
            }



        }


    };

    // 컴포넌트가 마운트될 때 사용자 리스트를 가져옵니다.


    useEffect(() => {
        console.log('Users state updated:', users);
    }, [users]);

    return (
        <div className="user-list-container">
            <h1>User List</h1>
            <ul>
                {users.length === 0 ? (
                    <li>No users found</li>
                ) : (
                    users.map(user => (
                        <li key={user.id} className="user-list-item">
                            <div className="user-info">
                                <div className="name">{user.name}</div>
                                <div className="subscription-status">
                                    {user.subscribed ? 'Subscribed' : 'Not Subscribed'}
                                    {user.subscribed && (
                                        <>
                                            <div>Start Date: {user.subscriptionStartDate}</div>
                                            <div>End Date: {user.subscriptionEndDate}</div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <button
                                className="subscribe-button"
                                onClick={() => handleSubscribeClick(user.id)}
                                disabled={user.subscribed}
                            >
                                {user.subscribed ? 'Renew Subscription' : 'Subscribe'}
                            </button>
                            {user.subscribed && (
                                <button
                                    className="unsubscribe-button"
                                    onClick={() => handleUnsubscribe(user.id)}
                                >
                                    Unsubscribe
                                </button>
                            )}
                        </li>
                    ))
                )}
            </ul>

            {/* modal page */}
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Subscribe</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>

                        <Form.Group controlId='cardCompany'>
                            <Form.Label>카드 회사</Form.Label>
                            <Form.Control
                                as='select'
                                value={cardCompany}
                                onChange={(e) => {
                                    console.log("Selected card company:", e.target.value);
                                    setCardCompany(e.target.value);
                                }}
                            >
                                <option value="">카드 회사를 선택하세요</option>
                                <option value="롯데카드">롯데카드</option>
                                <option value="신한카드">신한카드</option>
                                <option value="현대카드">현대카드</option>
                                <option value="삼성카드">삼성카드</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='cardNumber'>
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='카드 번호 입력'
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='secondary' onClick={handleModalClose}>닫기</Button>
                    <Button variant='primary' onClick={handleSubscribe}>구독하기</Button>
                </Modal.Footer>






            </Modal>





        </div>
    );
}
