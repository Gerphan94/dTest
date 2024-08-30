import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalVariables } from '../Store/AppContext';

const useInitPage = () => {
    const { projectId } = useParams();
    const { setProjectId, logginUser } = useGlobalVariables();

    useEffect(() => {
        setProjectId(projectId);
    }, [projectId, setProjectId]);

    return { projectId, logginUser };
};

export default useInitPage;


