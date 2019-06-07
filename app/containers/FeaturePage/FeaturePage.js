/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import './style.scss';

export default class FeaturePage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="feature-page">
            <h1>A propos</h1>
            <p>
            Fait par des usagers de la ligne de bus 87 de TCL.
        </p>
        <p>
            Après 3 ans de retards et aucune amélioration du service, nous avons décidé de mettre un outil à disposition afin de permettre à la TCL d'améliorer les pérformances de ses petites lignes.        
        </p>
            <p>Merci de l'utiliser avec parcimonie car la page envoie un mail au service client TCL, et au final ceux qui reçoivent les messages ne sont pas les résponsables de la mauvaise qualité du service.</p>
      </div>
    );
  }
}
