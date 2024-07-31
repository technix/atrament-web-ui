const HTMLFragment = ({index, item}) => (<span key={index} dangerouslySetInnerHTML={{__html: item}} />);
export default HTMLFragment;
