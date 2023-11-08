import React, { useState, useEffect } from 'react'; // Combine React imports here
import { observer } from 'mobx-react-lite'; // Only need to import once
import styled from 'styled-components';
import { Timeline } from './timeline/Timeline';
import { SidePanel } from './sidepanel/SidePanel';
import { Stage } from './stage/Stage';
import axios from 'axios';
// import JsonInputDialog from './JsonInputDialog'; // Make sure the import path is correct
import { useRouter } from 'next/router';
import { videoCreator } from '../stores/VideoCreatorStore';

const VideoCreator: React.FC = observer(() => {
  const router = useRouter();
  const { id } = router.query;
  const [showDialog, setShowDialog] = useState(true); // State to control the visibility of the dialog
  const getVideoById = async () => {
    try {
      await axios.get(`https://app.project-aeon.com/api/1.1/obj/Creatomate%20Data/${id}`, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CREATOMATE_AUTH_TOKEN}`,
          'Content-Type': 'application/json;application/x-www-form-urlencoded',
        }
      }).then((res)=>{
        console.log(res,'-----res')
        videoCreator.updateVideoSource(res.data.response.JSON);
      });
    } catch (error) {
      // Handle errors
      console.error('An error occurred while fetching data:', error);
    }
  };

  useEffect(() => {
    if(videoCreator.isReady) getVideoById()
  }, [videoCreator.isReady]);

  return (
    <Main>
      <MainView>
        <Stage />
        <SidePanel />
      </MainView>

      <Timeline />
    </Main>
  );
});

export default VideoCreator;

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  user-select: none;
`;

const MainView = styled.div`
  flex: 1;
  display: flex;
`;
