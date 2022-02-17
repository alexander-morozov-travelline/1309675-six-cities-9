import MainPage from '../main-page/main-page';

type AppProps = {
  countAds: number;
}
function App(props: AppProps): JSX.Element {
  const {countAds} = props;
  return (
    <MainPage countAds={countAds}/>
  );
}

export default App;
