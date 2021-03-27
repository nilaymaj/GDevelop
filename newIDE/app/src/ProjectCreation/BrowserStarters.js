// @flow
import { Trans } from '@lingui/macro';
import React, { Component } from 'react';
import { List, ListItem } from '../UI/List';
import Subheader from '../UI/Subheader';
import RaisedButton from '../UI/RaisedButton';
import { sendNewGameCreated } from '../Utils/Analytics/EventSender';
import { Column, Line } from '../UI/Grid';
import ListIcon from '../UI/ListIcon';
import Text from '../UI/Text';
import { type StorageProvider, type FileMetadata } from '../ProjectsStorage';
import InternalFileStorageProvider from '../ProjectsStorage/InternalFileStorageProvider';
const gd: libGDevelop = global.gd;

type Props = {|
  onOpen: (
    storageProvider: StorageProvider,
    fileMetadata: FileMetadata
  ) => void,
  onCreate: (
    gdProject,
    storageProvider: ?StorageProvider,
    fileMetadata: ?FileMetadata
  ) => void,
  onShowExamples: () => void,
|};

export default class BrowserStarters extends Component<Props> {
  render() {
    return (
      <Column noMargin>
        <Line>
          <Column>
            <Text>
              <Trans>Choose a game to use as a starter:</Trans>
            </Text>
          </Column>
        </Line>
        <Line>
          <Column expand noMargin>
            <List>
              <ListItem
                leftIcon={
                  <ListIcon
                    iconSize={40}
                    src="res/starters_icons/platformer.png"
                  />
                }
                primaryText={
                  <b>
                    <Trans>Platformer</Trans>
                  </b>
                }
                secondaryText={
                  <Trans>
                    A simple platform game, with coins to collect, moving
                    platforms and enemies.
                  </Trans>
                }
                secondaryTextLines={1}
                onClick={() => {
                  sendNewGameCreated('platformer');
                  this.props.onOpen(InternalFileStorageProvider, {
                    fileIdentifier: 'example://platformer',
                  });
                }}
              />
              <ListItem
                leftIcon={
                  <ListIcon
                    iconSize={40}
                    src="res/starters_icons/space-shooter.png"
                  />
                }
                primaryText={
                  <b>
                    <Trans>8-bit Space Shooter</Trans>
                  </b>
                }
                secondaryText={
                  <Trans>
                    A beautiful, retro side-scrolling shooter where you must
                    defeat incoming enemies with your mecha transforming
                    spaceship. Huge boss included!
                  </Trans>
                }
                secondaryTextLines={2}
                onClick={() => {
                  sendNewGameCreated('space-shooter');
                  this.props.onOpen(InternalFileStorageProvider, {
                    fileIdentifier: 'example://space-shooter',
                  });
                }}
              />
              <ListItem
                leftIcon={
                  <ListIcon
                    iconSize={40}
                    src="res/starters_icons/geometry-monster.png"
                  />
                }
                primaryText={
                  <b>
                    <Trans>Geometry Monster</Trans>
                  </b>
                }
                secondaryText={
                  <Trans>
                    A hyper casual endless game where you have to collect shapes
                    and avoid bombs, with a progressively increasing difficulty.
                  </Trans>
                }
                secondaryTextLines={1}
                onClick={() => {
                  sendNewGameCreated('geometry-monster');
                  this.props.onOpen(InternalFileStorageProvider, {
                    fileIdentifier: 'example://geometry-monster',
                  });
                }}
              />
              <ListItem
                leftIcon={
                  <ListIcon
                    iconSize={40}
                    src="res/starters_icons/isometric-game.png"
                  />
                }
                primaryText={
                  <b>
                    <Trans>Isometric game</Trans>
                  </b>
                }
                secondaryText={
                  <Trans>
                    An example of an isometric game where you can explore a map
                    with your character.
                  </Trans>
                }
                secondaryTextLines={1}
                onClick={() => {
                  sendNewGameCreated('isometric-game');
                  this.props.onOpen(InternalFileStorageProvider, {
                    fileIdentifier: 'example://isometric-game',
                  });
                }}
              />
              <ListItem
                leftIcon={
                  <ListIcon
                    iconSize={40}
                    src="res/starters_icons/downhill-bike-physics-demo.png"
                  />
                }
                primaryText={
                  <b>
                    <Trans>Downhill Bike Racing</Trans>
                  </b>
                }
                secondaryText={
                  <Trans>
                    An example of a 2D physics based game, where players have to
                    reach the end as fast as possible.
                  </Trans>
                }
                secondaryTextLines={1}
                onClick={() => {
                  sendNewGameCreated('downhill-bike-physics-demo');
                  this.props.onOpen(InternalFileStorageProvider, {
                    fileIdentifier: 'example://downhill-bike-physics-demo',
                  });
                }}
              />
              <ListItem
                leftIcon={
                  <ListIcon iconSize={40} src="res/starters_icons/pairs.png" />
                }
                primaryText={
                  <b>
                    <Trans>Pairs</Trans>
                  </b>
                }
                secondaryText={
                  <Trans>
                    Find all matching pairs of cards in this relaxing game. Use
                    tweens to create smooth, natural animations with a few
                    events.
                  </Trans>
                }
                secondaryTextLines={1}
                onClick={() => {
                  sendNewGameCreated('pairs');
                  this.props.onOpen(InternalFileStorageProvider, {
                    fileIdentifier: 'example://pairs',
                  });
                }}
              />
              <ListItem
                leftIcon={
                  <ListIcon iconSize={40} src="res/starters_icons/new.png" />
                }
                primaryText={
                  <b>
                    <Trans>Empty game</Trans>
                  </b>
                }
                secondaryText={<Trans>Start a new game from scratch.</Trans>}
                secondaryTextLines={1}
                onClick={() => {
                  sendNewGameCreated('');

                  const project = gd.ProjectHelper.createNewGDJSProject();
                  this.props.onCreate(project, null, null);
                }}
              />
              <Subheader>
                <Trans>Advanced</Trans>
              </Subheader>
              <ListItem
                leftIcon={
                  <ListIcon
                    iconSize={40}
                    src="res/starters_icons/particle-effects-demo.png"
                  />
                }
                primaryText={
                  <b>
                    <Trans>Particle Effects Demo</Trans>
                  </b>
                }
                secondaryText={
                  <Trans>
                    A demo of various high quality particle effects (fire,
                    magic, snow, rune spell...) that you can try and use in your
                    game.
                  </Trans>
                }
                secondaryTextLines={1}
                onClick={() => {
                  sendNewGameCreated('particle-effects-demo');
                  this.props.onOpen(InternalFileStorageProvider, {
                    fileIdentifier: 'example://particle-effects-demo',
                  });
                }}
              />
              <ListItem
                leftIcon={
                  <ListIcon
                    iconSize={40}
                    src="res/starters_icons/game-feel-demo.png"
                  />
                }
                primaryText={
                  <b>
                    <Trans>Game Feel Demo</Trans>
                  </b>
                }
                secondaryText={
                  <Trans>
                    A demo showing how to enhance the "game feel" of your
                    project: VFX, shot trail, ambient sounds and SFX,
                    screenshake, wobble...
                  </Trans>
                }
                secondaryTextLines={1}
                onClick={() => {
                  sendNewGameCreated('game-feel-demo');
                  this.props.onOpen(InternalFileStorageProvider, {
                    fileIdentifier: 'example://game-feel-demo',
                  });
                }}
              />
            </List>
            <Line alignItems="center" justifyContent="center">
              <RaisedButton
                label={<Trans>See examples</Trans>}
                onClick={() => this.props.onShowExamples()}
              />
            </Line>
          </Column>
        </Line>
      </Column>
    );
  }
}
