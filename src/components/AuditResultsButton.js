import React, { Fragment, Component } from 'react'
import { Icon, Button, Tooltip, Typography } from 'antd'

const { Text } = Typography

class AuditResultsButton extends Component {
  state = {
    auditSummary: {}
  }

  componentDidMount() {
    const { lighthouseSummaryLink } = this.props
    if (lighthouseSummaryLink) {
      window.fetch(lighthouseSummaryLink).then(result => result.json()).then(auditSummary => this.setState({ auditSummary }))
    }
  }

  getTextTypeForScore = (score) => {
    let className

    if (score < 50) className = 'danger'
    else if (score < 80) className = 'warning'

    return className
  }

  render() {
    const { lighthouseReportLink } = this.props
    const auditSummary = Object.entries(this.state.auditSummary).reduce((map, [category, score]) => ({ ...map, [category]: Math.floor(score * 100) }), {})
    if (!lighthouseReportLink) return null

    const summaryInformation = Object.keys(auditSummary).length > 0
      ? (
        <Fragment>
          <span><Icon type='clock-circle' /> <Text type={this.getTextTypeForScore(auditSummary.performance)}>{auditSummary.performance}</Text></span> &nbsp;
          <span><Icon type='user' /> <Text type={this.getTextTypeForScore(auditSummary.accessibility)}>{auditSummary.accessibility}</Text></span> &nbsp;
          <span><Icon type='check' /> <Text type={this.getTextTypeForScore(auditSummary['best-practices'])}>{auditSummary['best-practices']}</Text></span>
        </Fragment>
      )
      : <Icon type='loading' />

    console.log(summaryInformation)
    return (
      <Tooltip title='View Lighthouse Audit Report'>
        <Button type='default' href={lighthouseReportLink} target='_blank' rel='noopener'>
          { summaryInformation }
        </Button>
      </Tooltip>
    )
  }
}

export default AuditResultsButton
