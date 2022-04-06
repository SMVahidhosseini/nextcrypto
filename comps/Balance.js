import sigDigit from './sigDigits'
import { useEffect } from 'react'

const Balance = ({fetchedport, portfolio, balance, setbalance}) => {
	useEffect(() => {
		console.log(portfolio);
		if (fetchedport !== null && portfolio !== null) {
			let bal_tot = 0;
			portfolio.map((coin) => {
				if (coin.holding !== 0) {
					bal_tot = bal_tot + coin.holding * coin.current_price;
				}
			})
			setbalance(bal_tot);
		}
	}, [fetchedport]);

	return(
		<div className="balbackdrop">
			<div className="balmain" >
				<h4>Balance: {sigDigit(balance)} $</h4>
			</div>
		</div>
	);
}

export default Balance;