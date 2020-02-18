import React, { Component } from "react";
import Footer from "../../Layout/Footer";
import ElevatedTabs1 from "./ElevatedTabs";
class Point extends Component {
  render() {
    return (
      <>
        <ElevatedTabs1 />
        <div className="background-inner-page">
          <div className="text-center centered-h1-sz">
            <h3 className="h1-sz text-upper">Point System</h3>
          </div>
        </div>

        <div className="container">
          <div className="Content">
            <div className="clearfix">
              <br />
              <br />
              <br />
              <br />
            </div>
            <h3 className="content-h3">Points To Be Remembered</h3>
            <ul className="contentul">
              <li className="contentli">
                The cricketer you choose to be your fantasy cricket Team’s
                Captain will receive 2 times the points.
              </li>
              <li className="contentli"> Vice-Captain will receive 1.5 times the points.</li>
              <li className="contentli">
                Starting points are assigned to any player on the basis of
                announcement of his/her inclusion in the team. However,in case
                the player is unable to start the match after being included in
                the team sheet,player will not receive any points.
              </li>
              <li className="contentli"> From each side 11players play the game.</li>
              <li className="contentli">
                None of the events occurring during the super over , if any
                ,will be considerd for points to be assigned/applied to a
                player.
              </li>
              <li className="contentli">
                In case of run-outs involving 3 players from the fielding
                sides,all payers involvedwill be allotted 2 points each.
              </li>
              <li className="contentli">
                Any player scoring a century will only receive points for
                century and no points will be awarded for half-century. Any
                score above century will be elegible for bonus points only for
                the century.
              </li>
              <li className="contentli">
                Substitute players on the field will not be awarded points for
                any contributions.
              </li>
              <li className="contentli">
                Data is provided by reliable sources and once the points have
                been marked as completed,i.e. winners have been declared,no
                further adjustment will be made.
              </li>
              <li className="contentli">
                Points awarded live in-game are subject to change as long as the
                status is ‘waiting for review’or ‘in progress’.
              </li>
            </ul>
          </div>
        </div>

        <Footer />
      </>
    );
  }
}
export default Point;
