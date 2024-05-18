import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/mylogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Product() {
    const [test, setTest] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:80/product`, {
    }).then((res) => res.data).then(data => {
      setTest(data);
    }).catch((error) => {
      console.log(error);
    });

  }, []);
    return (
        <h3>{test.productID}</h3>
    )
}

export default Product