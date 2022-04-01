import Items from '../comps/Items'
import CoinBody from '../comps/CoinBody'
import { useState, useEffect, createContext } from 'react'
import useFetch from '../comps/useFetch'

export const getServerSideProps = async () => {
	try{
		const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y');
		const data = await res.json();
		return {
			props: { pageCoins: data }
		}
	} catch(err) {
		console.error(err);
	}
}

export const coinsContext = createContext()

export default function Home({pageCoins}) {
	const [coinperpageshow, setcoinperpageshow] = useState(true);
	const [pageCoinNo, setPageCoinNo] = useState(50);
	const [pageNo, setPageNo] = useState(1);
	const [activePage, setActivePage] = useState(1);
	const [finalPage, setFinalPage] = useState(240);
	const [descendingorder, setdescendingorder] = useState(true);
	const [sortItem, setsortItem] = useState('market_cap_rank');
	const [activeItem, setActiveItem] = useState('Home');

	const [coinStore, setcoinStore] = useState([]);
	const [coinStore2, setcoinStore2] = useState([]);

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

	return(
		<coinsContext.Provider value={coinStore}>
			<Items activeItem={activeItem} setActiveItem={setActiveItem} />
			<CoinBody pageCoinNo={pageCoinNo} pageNo={pageNo} setPageCoinNo={setPageCoinNo} activePage={activePage}
				setActivePage={setActivePage} finalPage={finalPage} setFinalPage={setFinalPage} setPageNo={setPageNo}
				descendingorder={descendingorder} setdescendingorder={setdescendingorder} sortItem={sortItem} setsortItem={setsortItem}
				pageCoins={pageCoins} />
		</coinsContext.Provider>
	);
}