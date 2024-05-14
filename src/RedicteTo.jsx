import { useHistory } from 'react-router-dom'

export const RedictTo = ({ urlString}) => {
    const history = useHistory();
    onUserClick = () => {
        history.push(`/`+ urlString);
    };
};