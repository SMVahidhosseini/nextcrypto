import {useState, useEffect, useContext} from 'react'
import {coinsContext2} from '../pages/coins/[coinid]'
import { useOutsideAlerter } from './outsideAlerter'

const Searchbar = () => {
	const coinStore = useContext(coinsContext2);
	const [search, setsearch] = useState('');
	const [results, setresults] = useState([]);
	const { visible: showSearch, setVisible: setshowSearch, ref } = useOutsideAlerter(false)

	const getSearchResults = (e) => {
		setsearch(e.target.value);
	}

	useEffect(() => {
		if (coinStore != null) {
			setresults(coinStore.filter(object => {
				if (search != '') {
					let arr = ((object.symbol.toLowerCase()).indexOf(search.toLowerCase()) === 0 || (object.id.toLowerCase()).indexOf(search.toLowerCase()) === 0);
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

	return(
		<div className="searchinner2">
			<input className="searchbar" type="text" placeholder=" &#128270; Search" autoComplete="off" value = {search} onInput={getSearchResults} />
			{showSearch && <div className="searchlist" ref={ref} >
					{results.map((coin) =>(
						<div key={coin.id}>
							<a href={'/coins/' + coin.id} target='_blank' >
								<div className="searchlist2" >
									{coin.thumb === 'missing_thumb.png' ? <span></span> : <img src={coin.thumb} width="20vw" height="20vw" />}
									<div className="divinfo">
										&nbsp;{coin.name} <span style={{fontSize:'0.8em'}}><strong>({coin.symbol})</strong> &nbsp; #{coin.market_cap_rank} </span>
									</div>
								</div><br/>
							</a>
						</div>
					))}
			</div>}
		</div>
	);
}

export default Searchbar;