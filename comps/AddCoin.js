import { useOutsideAlerter } from './outsideAlerter'
import { useState, useEffect } from 'react'
import SearchAdd from './SearchAdd'

const AddCoin = ({showaddcoin, setshowaddcoin, setportfolio, setsortItem}) => {
	const [selcoins, setselcoins] = useState([]);

	// Show add coin modal______________________________________________________________________________________________
	const { visible: showaddcoin2, setVisible: setshowaddcoin2, ref } = useOutsideAlerter(true)

	useEffect(() => {
		if (showaddcoin) {
			setshowaddcoin(showaddcoin2);
			setshowaddcoin2(showaddcoin);
		} else {
			setselcoins([]);
		}
	}, [showaddcoin2]);
	// Show add coin modal______________________________________________________________________________________________

	// Delete selected coins____________________________________________________________________________________________
	const handledelselcoin = (e) => {
		setselcoins(selcoins.filter(coin => {
			return coin.id != e;
		}))
	}
	// Delete selected coins____________________________________________________________________________________________

	// Add selected coins to portfolio__________________________________________________________________________________
	const handleaddtoport = () => {
		const portfolio = JSON.parse(localStorage.getItem('portfolio'));
		if (portfolio == null) {
			if (selcoins.length > 0) {
				localStorage.setItem('portfolio', JSON.stringify(selcoins.map(coin => ({ ...coin, holding: 0, balance: 0, balanceper: 0, ath: 0, ath_change_percentage: 0, price_change_percentage_1h_in_currency: 0, price_change_percentage_24h: 0, price_change_percentage_7d_in_currency: 0, price_change_percentage_30d_in_currency: 0, price_change_percentage_1y_in_currency: 0 }))));
			}
			const portfolio2 = JSON.parse(localStorage.getItem('portfolio'));
		    setportfolio(portfolio2);
		    setsortItem('market_cap_rank');
		} else {
			(selcoins.map(coin => ({ ...coin, holding: 0, balance: 0, balanceper: 0, ath: 0, ath_change_percentage: 0, price_change_percentage_1h_in_currency: 0, price_change_percentage_24h: 0, price_change_percentage_7d_in_currency: 0, price_change_percentage_30d_in_currency: 0, price_change_percentage_1y_in_currency: 0 }))).map(coin => {
				var index = portfolio.map(portcoin => {
					return portcoin.id;
				}).indexOf(coin.id);
				
				if (index == -1) {
					const portfolio = JSON.parse(localStorage.getItem('portfolio'));
					localStorage.setItem('portfolio', JSON.stringify([ ...portfolio, coin]));
				}
			})
			const portfolio2 = JSON.parse(localStorage.getItem('portfolio'));
			setportfolio(portfolio2);
			setsortItem('holding');
		}
		setshowaddcoin2(false);
	}
	// Add selected coins to portfolio__________________________________________________________________________________

	return(
		<>
			{showaddcoin && <div className="adcbackdrop">
				{showaddcoin2 && <div className="adcmain" ref={ref} >
					<h3>Add New Coins</h3>
					<SearchAdd selcoins={selcoins} setselcoins={setselcoins} />
					<div className="adcselcmain">
						<h4>Selected coins:</h4>
						<div className="adcselcoinmain" >
						{selcoins.map((coin) =>(
							<div className="adcselcoinlist" key={coin.id} >
								{coin.thumb === 'missing_thumb.png' ? <span></span> : <img src={coin.thumb} width="20vw" height="20vw" />}
								<div className="adcselcoininfo">&nbsp;{coin.name}</div>&nbsp;&nbsp;
								<div className="adcselcoincross" onClick={() => handledelselcoin(coin.id)}>
									<img src="/icons/cross.svg" width="12vw" height="12vw" />
								</div>
							</div>
						))}
						<button className="adcaddtolocbutton" onClick={handleaddtoport}>Add To Portfolio</button>
						</div>
					</div>
				</div>}
			</div>}
		</>
	);
}

export default AddCoin;