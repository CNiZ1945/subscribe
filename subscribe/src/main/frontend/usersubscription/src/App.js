import './App.css';
import UserList from './components/UserList';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaymentComponent from './portone/RequestPayment.js';


function App() {
	return (
		<div className="App">
			<UserList />
			{/* <PaymentComponent /> */}
		</div>
	);
}

export default App;
