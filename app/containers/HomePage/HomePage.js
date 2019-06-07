/* eslint-disable class-methods-use-this */
/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import './style.scss';
import TimePicker from 'react-time-picker';

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    state = {
      ligne: '87',
      arret: 'Penon',
      direction: 'Venissieux',
      horaire: '17:46',
      horaire_reel: '17:46',
      email: 'usagertcl@gmail.com',
      processing: false,
      done: false
    }

    buildMsg = () => {
      const msg = `
        Bonjour,
        Le transport de la ligne ${this.state.ligne} à l'arrêt ${this.state.arret} en direction de ${this.state.direction} devant passer à ${this.state.horaire} est passé à ${this.state.horaire_reel}.
        Bien courtoisement et à votre écoute,
        Client TCL`;
      return msg;
    };

    /**
       * when initial state username is not null, submit the form to load repos
       */
    componentDidMount() {
    }

    signaler = () => {
      const formData = this.state;
      this.setState({ processing: true });
      fetch('/api/submit', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      }).then((response) => {
        this.setState({ processing: false, done: true });
        response.json().then((text) => {
          console.log(text);
        });
      });
    }

    onChangeLigne = (data) => {
      this.setState({ ligne: data.currentTarget.value });
    }

    onChangeArret = (data) => {
      this.setState({ arret: data.currentTarget.value });
    }

    onChangeDirection = (data) => {
      this.setState({ direction: data.currentTarget.value });
    }

    onChangeHoraire = (data) => {
      this.setState({ horaire: data });
    }

    onChangeHoraireReel = (data) => {
      this.setState({ horaire_reel: data });
    }

    onChangeEmail = (data) => {
      this.setState({ email: data.currentTarget.value });
    }

    render = () => {
      const body = this.buildMsg();
      return (
        <article>
          <div className="home-page">
            <section>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                                            Ligne
                    </td>
                    <td>
                      <input
                        id="ligne"
                        type="text"
                        placeholder="87"
                        value={this.state.ligne}
                        onChange={this.onChangeLigne}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                                            Arret
                    </td>
                    <td>
                      <input
                        id="arret"
                        type="text"
                        placeholder="Penon"
                        value={this.state.arret}
                        onChange={this.onChangeArret}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                                            Direction
                    </td>
                    <td>
                      <input
                        id="direction"
                        type="text"
                        placeholder="Venissieux"
                        value={this.state.direction}
                        onChange={this.onChangeDirection}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                                            Horaire Theorique
                    </td>
                    <td>
                      <TimePicker
                        id="horaire"
                        value={this.state.horaire}
                        onChange={this.onChangeHoraire}
                        disableClock
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                                            Horaire Réel
                    </td>
                    <td>
                      <TimePicker
                        id="horaire_reel"
                        value={this.state.horaire_reel}
                        onChange={this.onChangeHoraireReel}
                        disableClock
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                                            Email
                    </td>
                    <td>
                      <input
                        id="email"
                        type="text"
                        placeholder="usagerlyon@gmail.com"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <section>
                                Message final : <div style={{ whiteSpace: 'pre-wrap' }}>{body}</div>
              </section>
              <section style={{ textAlign: 'center' }}>
                {!this.state.processing && !this.state.done && <button disabled={this.state.processing} className="router-link" style={{ fontSize: '40px' }} onClick={this.signaler}>Signaler</button>}
                <br />
                {this.state.processing && <label>En cours...</label>}
                {this.state.done && <label>Signalé avec succès, verifiez votre messagerie</label>}
              </section>
            </section>
          </div>
        </article>
      );
    }
}
