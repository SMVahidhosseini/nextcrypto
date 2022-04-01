import sigDigit from './sigDigits'
import { useState, useEffect } from 'react'

const P_main_coins = ({portfolio: portfolio2, portfolio3, ids, setids, setportfolio3, descendingorder, setdescendingorder, sortItem, showedit, setshowedit, editcoin, seteditcoin, holdinginedit, setholdinginedit, setdeletecoin, setshowdelete, showdelete}) => {
	const [portfolio, setportfolio] = useState([]);
	const [showdetails, setshowdetails] = useState(false);
	const [showdetailsid, setshowdetailsid] = useState('');
	const [time2, settime2] = useState('');

	// Sort Items___________________________________________________________________________________________
	useEffect(() => {
		if (portfolio2 !== null) {
			setportfolio([ ...portfolio2]);
			setportfolio3([ ...portfolio2]);
		}
	}, [portfolio2]);

	useEffect(() => {
		if (portfolio3 != null) {
			portfolio3.sort((a, b) => {
				if (descendingorder) {
					return (a[sortItem] - b[sortItem]);
				}
				else {
					return (b[sortItem] - a[sortItem]);
				}
			});
			setportfolio([ ...portfolio3]);
		}
	}, [descendingorder, portfolio3]);

	useEffect(() => {
		if (sortItem === 'balance') {
			setdescendingorder(false);
		} else {
			setdescendingorder(true);
		}
	}, [sortItem]);
	// Sort Items___________________________________________________________________________________________

	// Edit holding_________________________________________________________________________________________
	const handleshowedit = (e) => {
		seteditcoin(e);
		setshowedit(!showedit);
	}

	useEffect(() => {
		setholdinginedit(editcoin.holding)
	}, [editcoin]);
	// Edit holding_________________________________________________________________________________________

	// Delete coin__________________________________________________________________________________________
	const handleshowdelete = (e) => {
		setdeletecoin(e);
		setshowdelete(!showdelete);
	}
	// Delete coin__________________________________________________________________________________________

	// Show details_________________________________________________________________________________________
	const handledetails = (coin) => {
		let time = new Date((coin.ath_date).split('T')[0]);
		settime2(time.toDateString());
		setshowdetailsid(coin.id);
		if (coin.id == showdetailsid) {
			setshowdetails(!showdetails);
		} else {
			setshowdetails(true);
		}
	}
	// Show details_________________________________________________________________________________________

	return(
		<div className="maincoins">
			{portfolio && <div>
				{portfolio.map((coin) =>(
					<div key={coin.id}>
						<div className="tcoinsmain" >
							{coin.market_cap_rank === null
								? <div className="tcoinsonec" onClick={() => handledetails(coin)}>{showdetails && showdetailsid==coin.id ? <span>&#x25b4;</span> : <span>&#x25be;</span>} ?</div>
								: <div className="tcoinsonec" onClick={() => handledetails(coin)}>{showdetails && showdetailsid==coin.id ? <span>&#x25b4;</span> : <span>&#x25be;</span>} {coin.market_cap_rank}</div>}
							<div className="tcoinstable">
								<a href={'/coins/' + coin.id} target='_blank' >
									<table>
										<tbody>
											<tr>
												<td rowSpan="2" className="tcoinsbreaked_logo"><img src={(coin.image).replace("large", "thumb")} width="30vw" height="30vw" /></td>
												<td className="tcoinsbreaked_symbol">{coin.symbol}</td>
											</tr>
											<tr>
												<td className="tcoinsbreaked_name">{coin.name}</td>
											</tr>
										</tbody>
									</table>
								</a>
							</div>
							<div className="tcoinsafteronec">{sigDigit(coin.current_price)}</div>
							<div className="tcoinspercentage">
								<div className="tcoinsafteronec" className={coin.price_change_percentage_1h_in_currency >= 0 ? 'tcoinspositive' : 'tcoinsnegative'}>{Number(coin.price_change_percentage_1h_in_currency).toFixed(1)}%</div>
								<div className="tcoinsafteronec" className={coin.price_change_percentage_24h >= 0 ? 'tcoinspositive' : 'tcoinsnegative'}>{Number(coin.price_change_percentage_24h).toFixed(1)}%</div>
								<div className="tcoinsafteronec" className={coin.price_change_percentage_7d_in_currency >= 0 ? 'tcoinspositive' : 'tcoinsnegative'}>{Number(coin.price_change_percentage_7d_in_currency).toFixed(1)}%</div>
							</div>
							<div className="tcoinsafteronec">{sigDigit(coin.market_cap)}</div>
							<div className="tcoinsafteronec">{sigDigit(coin.holding)} ({sigDigit(coin.balance)} $) </div>
							<div className="tcoinsafteronecedit">
								<img src="/icons/delete.svg" className="porteditbuttons" width="20vw" height="20vw" onClick={() => handleshowdelete(coin)} />
								<img src="/icons/edit.svg" className="porteditbuttons" width="20vw" height="20vw" onClick={() => handleshowedit(coin)} />
							</div>
						</div>

						<div className={(showdetails && showdetailsid==coin.id) ? "detcinfinfoshow" : "detcinfinfohide"}>
							<div className="cinfinfo_det_main">
								<div className="cinfinfo_det">
									<table>
										<tbody>
											<tr className="cinfinfo_tr">
												<td className="cinftd1"><strong>Market Cap:</strong></td>
												<td className="cinftd2">{sigDigit(coin.market_cap)}$</td>
											</tr>
											<tr className="cinfinfo_tr">
												<td className="cinftd1"><strong>Total Volume:</strong></td>
												<td className="cinftd2">{sigDigit(coin.total_volume)}$</td>
											</tr>
											<tr className="cinfinfo_tr">
												<td className="cinftd1"><strong>Fully Diluted Marrket Cap:</strong></td>
												<td className="cinftd2">{sigDigit(coin.fully_diluted_valuation)}$</td>
											</tr>
											<tr className="cinfinfo_tr">
												<td className="cinftd1"><strong>Circulating Supply:</strong></td>
												<td className="cinftd2">{sigDigit(coin.circulating_supply)}</td>
											</tr>
											<tr className="cinfinfo_tr">
												<td className="cinftd1"><strong>Max Supply:</strong></td>
												<td className="cinftd2">{sigDigit(coin.max_supply)}</td>
											</tr>
											<tr className="cinfinfo_tr">
												<td className="cinftd1"><strong>Circulating/Max:</strong></td>
												<td className="cinftd2">{(coin.circulating_supply/coin.max_supply).toFixed(2)}</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className="cinfinfo_det">
									<table>
										<tbody>
											<tr className="cinfinfo_tr">
												<td className="cinftd1"><strong>All-Time High:</strong></td>
												<td className="cinftd2">{sigDigit(coin.ath)}$ &nbsp;&nbsp; <span className={coin.ath_change_percentage >= 0 ? 'cinftdpos' : 'cinftdneg'} >{coin.ath_change_percentage.toFixed(1)}%</span> </td>
											</tr>
											<tr className="cinfinfo_tr">
												<td className="cinftd1"><strong>All-Time High Date:</strong></td>
												<td className="cinftd2">{time2}</td>
											</tr>
											<tr className="cinfinfo_tr">
												<td className="cinftd1"><strong>24h High:</strong></td>
												<td className="cinftd2">{sigDigit(coin.high_24h)}$</td>
											</tr>
											<tr className="cinfinfo_tr">
												<td className="cinftd1"><strong>24h Low:</strong></td>
												<td className="cinftd2">{sigDigit(coin.low_24h)}$</td>
											</tr>
											<tr className="cinfinfo_tr">
												<td className="cinftd1"><strong></strong></td>
												<td className="cinftd2">&nbsp;</td>
											</tr>
											<tr className="cinfinfo_tr">
												<td className="cinftd1"><strong></strong></td>
												<td className="cinftd2">&nbsp;</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className="cinfinfo_det">
									<table>
										<tbody>
											<tr className="cinfinfo_tr">
												<td className="cinftd1"><strong>1h Change:</strong></td>
												{coin.price_change_percentage_1h_in_currency===null ? <td className='cinftdnull'>?</td> : <td className={coin.price_change_percentage_1h_in_currency >= 0 ? 'cinftdpos' : 'cinftdneg'} >{coin.price_change_percentage_1h_in_currency.toFixed(1)}%</td>}
											</tr>
											<tr className="cinfinfo_tr">
												<td className="cinftd1"><strong>24h Change:</strong></td>
												{coin.price_change_percentage_24h===null ? <td className='cinftdnull'>?</td> : <td className={coin.price_change_percentage_24h >= 0 ? 'cinftdpos' : 'cinftdneg'} >{coin.price_change_percentage_24h.toFixed(1)}%</td>}
											</tr>
											<tr className="cinfinfo_tr">
												<td className="cinftd1"><strong>7d Change:</strong></td>
												{coin.price_change_percentage_7d_in_currency===null ? <td className='cinftdnull'>?</td> : <td className={coin.price_change_percentage_7d_in_currency >= 0 ? 'cinftdpos' : 'cinftdneg'} >{coin.price_change_percentage_7d_in_currency.toFixed(1)}%</td>}
											</tr>
											<tr className="cinfinfo_tr">
												<td className="cinftd1"><strong>30d Change:</strong></td>
												{coin.price_change_percentage_30d_in_currency===null ? <td className='cinftdnull'>?</td> : <td className={coin.price_change_percentage_30d_in_currency >= 0 ? 'cinftdpos' : 'cinftdneg'} >{coin.price_change_percentage_30d_in_currency.toFixed(1)}%</td>}
											</tr>
											<tr className="cinfinfo_tr">
												<td className="cinftd1"><strong>1y Change:</strong></td>
												{coin.price_change_percentage_1y_in_currency===null ? <td className='cinftdnull'>?</td> : <td className={coin.price_change_percentage_1y_in_currency >= 0 ? 'cinftdpos' : 'cinftdneg'} >{coin.price_change_percentage_1y_in_currency.toFixed(1)}%</td>}
											</tr>
											<tr className="cinfinfo_tr">
												<td className="cinftd1"><strong></strong></td>
												<td className="cinftd2">&nbsp;</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>}
		</div>
	);
}

export default P_main_coins;