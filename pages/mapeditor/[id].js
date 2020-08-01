import { useRouter } from 'next/router'
import MapEditor from '../../components/MapEditor'

const Editor = props =>{
    return (
        <>
        
        <MapEditor id={props.id}/>
        </>
    )
}
Editor.getInitialProps = ({query})=>{
    return {
        id: query.id
    }
}

export default Editor;