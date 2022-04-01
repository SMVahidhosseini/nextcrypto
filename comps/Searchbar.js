import {useState, useEffect, useContext} from 'react'
import {coinsContext} from '../pages/index'
import { useOutsideAlerter } from './outsideAlerter'

const Searchbar = () => {
	const coinStore = useContext(coinsContext);
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

	return(
		<div className="searchmain">
			<div className="searchinner">
				<input className="searchbar" type="text" placeholder=" &#128270; Search" autoComplete="off" value = {search} onInput={getSearchResults} />
				{showSearch && <div className="searchlist" ref={ref} >
						{results.map((coin) =>(
							<div key={coin.id}>
								<a href={'/coins/' + coin.id} target='_blank' >
									<div className="searchlist2" >
										<img src={(coin.image).replace("large", "thumb")} width="20vw" height="20vw" />
										<div className="divinfo">
											&nbsp;{coin.name} <span style={{fontSize:'0.8em'}}><strong>({coin.symbol})</strong> &nbsp; #{coin.market_cap_rank} </span>
										</div>
									</div><br/>
								</a>
							</div>
						))}
				</div>}
			</div>
		</div>
	);
}

export default Searchbar;