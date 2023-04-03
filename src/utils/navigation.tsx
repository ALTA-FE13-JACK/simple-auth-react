import {
  useNavigate,
  useParams,
  NavigateFunction,
  Params,
} from "react-router-dom";

export interface NavigateParams {
  navigate: NavigateFunction;
  params: Readonly<Params<string>>;
}
const withRouter = (Component: any) => {
  const Wrapper = (props: any) => {
    const navigate = useNavigate();
    const params = useParams();
    return <Component {...props} navigate={navigate} params={params} />;
  };
  return Wrapper;
};

export default withRouter;
