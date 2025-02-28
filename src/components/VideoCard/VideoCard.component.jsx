import React from 'react';
//import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CurrentVideoContext from '../../context/current-video-context';
import { useHistory } from 'react-router-dom';
import {
  VideoCardStyled,
  VideoThumbnail,
  VideoTitle,
  VideoDescription,
} from './VideoCard.styled';

const VideoCard = (props) => {
  let history = useHistory();
  const currentVideoContext = React.useContext(CurrentVideoContext);
  const {
    id = '',
    title = '',
    description = '',
    imgsrc = '',
    displayDescription = true,
  } = props;
  const onClickHandler = () => {
    currentVideoContext.setVideoDetails({
      id: id,
      title: title,
      description: description,
      imgsrc: imgsrc,
    });
    history.push(`/video/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <VideoCardStyled
      data-testid="video-card-component"
      onClick={onClickHandler}
      id={id}
    >
      <VideoThumbnail src={imgsrc} data-testid="video-card-thumbnail" />
      <VideoTitle>{title}</VideoTitle>
      {displayDescription ? (
        <VideoDescription>{description}</VideoDescription>
      ) : null}
      {props.children}
    </VideoCardStyled>
  );
};

export default VideoCard;
