import sigDigit from './sigDigits'

const Balance = ({balance}) => {

	return(
		<div className="balbackdrop">
			<div className="balmain" >
				<h4>Balance: {sigDigit(balance)} $</h4>
			</div>
		</div>
	);
}

export default Balance;