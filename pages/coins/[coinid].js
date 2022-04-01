import Searchbar from '../../comps/Searchbar2'
import { useState, useEffect, createContext } from 'react'
import useFetch from '../../comps/useFetch'
import sigDigit from '../../comps/sigDigits'
import Link from 'next/link'

export const getServerSideProps = async (context) => {
	try{
		const coinid = context.params.coinid;
		const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinid}?community_data=true`);
		const coin = await res.json();
		const time = new Date((coin.market_data.ath_date.usd).split('T')[0]);
		const time2 = await time.toDateString();
		const options =  await { symbol: `BINANCE:${coin.symbol}USDT`, theme: "light", autosize: true, locale: "en", timezone: "Asia/Tehran", interval: "60", withdateranges: true };
		return {
			props: { coin, time2, options }
		}
	} catch(err) {
		console.error(err);
	}
}

export const coinsContext2 = createContext()

const Details = ({coin, time2, options}) => {
	const [coinStore, setcoinStore] = useState([]);
	const [coinStore2, setcoinStore2] = useState([]);
	const [coins2, setcoins2] = useState([]);

	// CoinStore______________________________________________________________________________________________
	async function fillCoinStore(num, page) {
		try{
			for (var i = 1; i <= page; i++) {
				const res = (await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${num}&page=${i}&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y`));
				let coins = await res.json();
				await setcoins2(coins);
			}
		} catch(err) {
			console.error(err);
		}
	}

	useEffect(() => {
		fillCoinStore(250, 3);
	}, []);

	useEffect(() => {
		setcoinStore2([...coinStore2, ...coins2]);
	}, [coins2]);

	useEffect(() => {
		coinStore2.sort((a, b) => {
			return (a['market_cap_rank'] - b['market_cap_rank']);
		});
		setcoinStore([ ...coinStore2]);
	}, [coinStore2]);
	// CoinStore______________________________________________________________________________________________

	return(
		<coinsContext2.Provider value={coinStore}>
			<div className="tabs2">
				<Searchbar />
			</div>
			<div className="coinbody">
				<h1 className="cinfcoinname">{coin.name}</h1>
				<div className="cinffirstinfo">
					<div className="cinffirstinfoimage">
						<img src={coin.image.large} width="100vw" height="100vw"/>
					</div>
					<p className="cinffirstinfo_det">
						<strong>Name:</strong>
						<span style={{fontSize: '0.8em'}}> {coin.name} <strong>({coin.symbol})</strong></span><br/>
						<strong>Rank:</strong> <span style={{fontSize: '0.8em'}}>{coin.market_cap_rank}</span><br/>
						<strong>Price:</strong> <span style={{fontSize: '0.8em'}}>{sigDigit(coin.market_data.current_price.usd)} $</span><br/>
						<strong>Market Cap:</strong> <span style={{fontSize: '0.8em'}}>{sigDigit(coin.market_data.market_cap.usd)}$ </span><br/>
						<strong>Volume:</strong> <span style={{fontSize: '0.8em'}}>{sigDigit(coin.market_data.total_volume.usd)}$ </span>
					</p>
				</div>

				<div className="cinfsocial">
					<div className="cinfcontent">
						<a href={coin.links.homepage[0]} target="_blank" rel="noreferrer">
							<table>
								<tbody>
									<tr>
										<td>
											<img src="/icons/home.svg" /> 
										</td>
										<td>Website</td>
									</tr>
								</tbody>
							</table>
						</a>
					</div>
					<div className="cinfcontent">
						<a href={'https://twitter.com/' + coin.links.twitter_screen_name} target="_blank" rel="noreferrer" >
							<table>
								<tbody>
									<tr>
										<td>
											<img src="/icons/twitter.svg" /> 
										</td>
										<td>Twitter</td>
									</tr>
								</tbody>
							</table>
						</a>
					</div>
					<div className="cinfcontent">
						<a href={'https://t.me/' + coin.links.telegram_channel_identifier} target="_blank" rel="noreferrer" >
							<table>
								<tbody>
									<tr>
										<td>
											<img src="/icons/telegram.svg" /> 
										</td>
										<td>Telegram</td>
									</tr>
								</tbody>
							</table>
						</a>
					</div>
					<div className="cinfcontent">
						<a href={coin.links.subreddit_url} target="_blank" rel="noreferrer" >
							<table>
								<tbody>
									<tr>
										<td>
											<img src="/icons/reddit.svg" /> 
										</td>
										<td>Reddit</td>
									</tr>
								</tbody>
							</table>
						</a>
					</div>
					<div className="cinfcontent">
						<a href={coin.links.chat_url[1]} target="_blank" rel="noreferrer" >
							<table>
								<tbody>
									<tr>
										<td>
											<img src="/icons/discord.svg" /> 
										</td>
										<td>Discord</td>
									</tr>
								</tbody>
							</table>
						</a>
					</div>
					<div className="cinfcontent">
						<a href={coin.links.blockchain_site[0]} target="_blank" rel="noreferrer" >
							<table>
								<tbody>
									<tr>
										<td>
											<strong style={{color: '#E65100'}}> Explorer:</strong> {((coin.links.blockchain_site[0]).replace("https://", "")).split('/')[0]}
										</td>
									</tr>
								</tbody>
							</table>
						</a>
					</div>
				</div>

				<div className="cinfinfo">
					<div className="cinfinfo_det">
						<table>
							<tbody>
								<tr className="cinfinfo_tr">
									<td className="cinftd1"><strong>Market Cap:</strong></td>
									<td className="cinftd2">{sigDigit(coin.market_data.market_cap.usd)}$</td>
								</tr>
								<tr className="cinfinfo_tr">
									<td className="cinftd1"><strong>Total Volume:</strong></td>
									<td className="cinftd2">{sigDigit(coin.market_data.total_volume.usd)}$</td>
								</tr>
								<tr className="cinfinfo_tr">
									<td className="cinftd1"><strong>Fully Diluted Marrket Cap:</strong></td>
									<td className="cinftd2">{sigDigit(coin.market_data.fully_diluted_valuation.usd)}$</td>
								</tr>
								<tr className="cinfinfo_tr">
									<td className="cinftd1"><strong>Circulating Supply:</strong></td>
									<td className="cinftd2">{sigDigit(coin.market_data.circulating_supply)}</td>
								</tr>
								<tr className="cinfinfo_tr">
									<td className="cinftd1"><strong>Max Supply:</strong></td>
									<td className="cinftd2">{sigDigit(coin.market_data.max_supply)}</td>
								</tr>
								<tr className="cinfinfo_tr">
									<td className="cinftd1"><strong>Circulating/Max:</strong></td>
									<td className="cinftd2">{(coin.market_data.circulating_supply/coin.market_data.max_supply).toFixed(2)}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="cinfinfo_det">
						<table>
							<tbody>
								<tr className="cinfinfo_tr">
									<td className="cinftd1"><strong>All-Time High:</strong></td>
									<td className="cinftd2">{sigDigit(coin.market_data.ath.usd)}$ &nbsp;&nbsp; <span className={coin.market_data.ath_change_percentage.usd >= 0 ? 'cinftdpos' : 'cinftdneg'} >{coin.market_data.ath_change_percentage.usd.toFixed(1)}%</span> </td>
								</tr>
								<tr className="cinfinfo_tr">
									<td className="cinftd1"><strong>All-Time High Date:</strong></td>
									<td className="cinftd2">{time2}</td>
								</tr>
								<tr className="cinfinfo_tr">
									<td className="cinftd1"><strong>24h High:</strong></td>
									<td className="cinftd2">{sigDigit(coin.market_data.high_24h.usd)}$</td>
								</tr>
								<tr className="cinfinfo_tr">
									<td className="cinftd1"><strong>24h Low:</strong></td>
									<td className="cinftd2">{sigDigit(coin.market_data.low_24h.usd)}$</td>
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
									<td className={coin.market_data.price_change_percentage_1h_in_currency.usd >= 0 ? 'cinftdpos' : 'cinftdneg'} >{coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1)}%</td>
								</tr>
								<tr className="cinfinfo_tr">
									<td className="cinftd1"><strong>24h Change:</strong></td>
									<td className={coin.market_data.price_change_percentage_24h >= 0 ? 'cinftdpos' : 'cinftdneg'} >{coin.market_data.price_change_percentage_24h.toFixed(1)}%</td>
								</tr>
								<tr className="cinfinfo_tr">
									<td className="cinftd1"><strong>7d Change:</strong></td>
									<td className={coin.market_data.price_change_percentage_7d >= 0 ? 'cinftdpos' : 'cinftdneg'} >{coin.market_data.price_change_percentage_7d.toFixed(1)}%</td>
								</tr>
								<tr className="cinfinfo_tr">
									<td className="cinftd1"><strong>30d Change:</strong></td>
									<td className={coin.market_data.price_change_percentage_30d >= 0 ? 'cinftdpos' : 'cinftdneg'} >{coin.market_data.price_change_percentage_30d.toFixed(1)}%</td>
								</tr>
								<tr className="cinfinfo_tr">
									<td className="cinftd1"><strong>1y Change:</strong></td>
									<td className={coin.market_data.price_change_percentage_1y >= 0 ? 'cinftdpos' : 'cinftdneg'} >{coin.market_data.price_change_percentage_1y.toFixed(1)}%</td>
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

			<div className="cinfdivtradingview">
				<iframe title="chart" src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_faac6&symbol=binance%3A${coin.symbol.toUpperCase()}USDT&interval=H&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=Light&style=1&timezone=Asia%2FTehran&hideideasbutton=1&withdateranges=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&utm_medium=widget&utm_campaign=chart&utm_term=binance%3A${coin.symbol.toUpperCase()}USDT`} frameBorder="0" width="100%" height="600"></iframe>
			</div>
		</coinsContext2.Provider>
	);
}

export default Details;