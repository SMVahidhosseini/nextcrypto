import Items from '../comps/Items3'
import { useState, useEffect, createContext } from 'react'
import useFetch from '../comps/useFetch'
import AddCoin from '../comps/AddCoin'
import P_main_coins from '../comps/P_main_coins'
import P_main_h from '../comps/P_main_h'
import Edit from '../comps/Edit'
import Delete from '../comps/Delete'
import Balance from '../comps/Balance'

export const coinsContext3 = createContext()

const Portfolio = () => {
	const [activeItem, setActiveItem] = useState('Portfolio');
	const [showaddcoin, setshowaddcoin] = useState(false);
	const [coinStore, setcoinStore] = useState([]);
	const [coinStore2, setcoinStore2] = useState([]);
	const [portfolio, setportfolio] = useState([]);
	const [descendingorder, setdescendingorder] = useState(true);
	const [sortItem, setsortItem] = useState('holding');
	const [ids, setids] = useState('');
	const [portfolio3, setportfolio3] = useState([]);
	const [showedit, setshowedit] = useState(false);
	const [editcoin, seteditcoin] = useState({holding: 0});
	const [holdinginedit, setholdinginedit] = useState(0);
	const [showdelete, setshowdelete] = useState(false);
	const [deletecoin, setdeletecoin] = useState(null);
	const [balance, setbalance] = useState(0);

	// CoinStore______________________________________________________________________________________________
	for (var i = 1; i < 4; i++) {
		const { data: coinStorefiller, setData: setcoinStorefiller, error, isPending } = useFetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${i}&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y`);
		useEffect(() => {
			if (coinStorefiller != null && coinStorefiller != []) {
				setcoinStore2([...coinStore2, ...coinStorefiller])
			}
		}, [coinStorefiller]);
	}

	useEffect(() => {
		coinStore2.sort((a, b) => {
			return (a['market_cap_rank'] - b['market_cap_rank']);
		});
		setcoinStore([ ...coinStore2]);
	}, [coinStore2]);
	// CoinStore______________________________________________________________________________________________

	// Localstorage___________________________________________________________________________________________
	const { data: fetchedport, setData: setfetchedport, error, isPending } = useFetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y`);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setportfolio(JSON.parse(localStorage.getItem('portfolio')));
		}
	}, []);

	useEffect(() => {
		let idss = '';
		if (portfolio !== null) {
			portfolio.map((coin) => {
				idss = idss + `${coin.id}%2C%20`;
			})
			setids(idss);
		}
	}, [portfolio]);

	useEffect(() => {
		setsortItem('balance');
		if (fetchedport !== null && portfolio !== null) {
			portfolio.map((coin) => {
				fetchedport.map((fetchedcoin) => {
					if (coin.id === fetchedcoin.id) {
						Object.assign(coin, fetchedcoin);
					}
				})
			});
			setportfolio3(portfolio);
			localStorage.setItem('portfolio', JSON.stringify(portfolio));
		}
	}, [fetchedport]);
	// Localstorage___________________________________________________________________________________________

	// Show add coin__________________________________________________________________________________________
	const handleaddcoin = () => {
		setshowaddcoin(!showaddcoin);
	}
	// Show add coin__________________________________________________________________________________________

	return(
		<coinsContext3.Provider value={coinStore} >
			<Balance fetchedport={fetchedport} portfolio={portfolio} balance={balance} setbalance={setbalance} />
			<Delete showdelete={showdelete} setshowdelete={setshowdelete} deletecoin={deletecoin} portfolio={portfolio}
				ids={ids} setids={setids} setportfolio={setportfolio} setsortItem={setsortItem} />
			<Edit showedit={showedit} setshowedit={setshowedit} editcoin={editcoin} portfolio={portfolio} setportfolio3={setportfolio3}
				ids={ids} setids={setids} holdinginedit={holdinginedit} setholdinginedit={setholdinginedit} setsortItem={setsortItem} />
			<AddCoin showaddcoin={showaddcoin} setshowaddcoin={setshowaddcoin} setportfolio={setportfolio} setsortItem={setsortItem} />
			<Items activeItem={activeItem} setActiveItem={setActiveItem} />
			<div className="portbody">
				<div className="portdivaddbut">
					<button className="portaddbut" onClick={handleaddcoin} >Add New Coins</button>
				</div>
				<P_main_h descendingorder={descendingorder} setdescendingorder={setdescendingorder} sortItem={sortItem} setsortItem={setsortItem} />
				<P_main_coins descendingorder={descendingorder} setdescendingorder={setdescendingorder} sortItem={sortItem}
					setsortItem={setsortItem} portfolio={portfolio} portfolio3={portfolio3} setportfolio3={setportfolio3}
					ids={ids} setids={setids} showedit={showedit} setshowedit={setshowedit} editcoin={editcoin}
					seteditcoin={seteditcoin} holdinginedit={holdinginedit} setholdinginedit={setholdinginedit}
					showdelete={showdelete} setshowdelete={setshowdelete} deletecoin={deletecoin}
					setdeletecoin={setdeletecoin} />
			</div>
		</coinsContext3.Provider>
	);
}

export default Portfolio;