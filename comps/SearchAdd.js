import {useState, useEffect, useContext} from 'react'
import {coinsContext3} from '../pages/portfolio'
import { useOutsideAlerter } from './outsideAlerter'

const SearchAdd = ({selcoins, setselcoins}) => {
	const coinStore = useContext(coinsContext3);
	const [search, setsearch] = useState('');
	const [results, setresults] = useState([]);
	const { visible: showSearch, setVisible: setshowSearch, ref } = useOutsideAlerter(false);

	// Search______________________________________________________________________________________________
	const getSearchResults = (e) => {
		setsearch(e.target.value);
	}

	useEffect(() => {
		if (coinStore != null) {
			setresults(coinStore.filter(object => {
				if (search != '') {
					let arr = (object.symbol.indexOf(search.toLowerCase()) === 0 || object.id.indexOf(search.toLowerCase()) === 0);
					return arr;
				}
			}));
		}
	}, [search]);

	useEffect(() => {
		if (search == '') {
			setshowSearch(false);
		} else {
			setshowSearch(true);
		}
	}, [search]);

	useEffect(() => {
		if (results.length == 0) {
			setshowSearch(false);
		}
	}, [results])
	// Search______________________________________________________________________________________________

	// Slecting coins______________________________________________________________________________________
	const handleselcoin = (e) => {
		const selcoin = coinStore.find(coin => coin.id === e);

		var index = selcoins.map(coin => {
			return coin.id;
		}).indexOf(e);

		if (index > -1) {
			selcoins.splice(index, 1);
		}

		setselcoins([ ...selcoins, selcoin]);
	}
	// Slecting coins______________________________________________________________________________________

	return(
		<div className="addsearchmain">
			<div className="addsearchinner">
				<input className="addsearchbar" type="text" placeholder=" &#128270; Search the coin" autoComplete="off" value = {search} onInput={getSearchResults} />
				{showSearch && <div className="addsearchlist" ref={ref} >
						{results.map((coin) =>(
							<div key={coin.id} onClick={() => handleselcoin(coin.id)} >
								<div className="addsearchlist2" >
									<img src={(coin.image).replace("large", "thumb")} width="20vw" height="20vw" />
									<div className="adddivinfo">
										&nbsp;{coin.name} <span style={{fontSize:'0.8em'}}><strong>({coin.symbol})</strong> &nbsp; #{coin.market_cap_rank} </span>
									</div>
								</div><br/>
							</div>
						))}
				</div>}
			</div>
		</div>
	);
}

export default SearchAdd;