import express from 'express';
import { BaseController, TemplateHelpers } from './base_controller';
import { PaperTradingService } from '../paper/paper_service';
import { ProfileService } from '../profile/profile_service';
import type { PaperAccountView } from '../paper/types';

export class PaperController extends BaseController {
  constructor(
    templateHelpers: TemplateHelpers,
    private readonly paperService: PaperTradingService,
    private readonly profileService: ProfileService
  ) {
    super(templateHelpers);
  }

  registerRoutes(router: express.Router): void {
    router.get('/paper', this.index.bind(this));
    router.post('/paper/:profileId/reset', this.reset.bind(this));
  }

  private async index(req: express.Request, res: express.Response): Promise<void> {
    const profiles = this.profileService.getProfiles().filter(profile => (profile.bots || []).some(bot => bot.mode === 'paper'));

    const accounts: PaperAccountView[] = [];
    for (const profile of profiles) {
      accounts.push(await this.paperService.getAccountView(profile.id, profile.exchange, profile.paperBalance));
    }

    const totalEquity = accounts.reduce((sum, account) => sum + account.equity, 0);
    const totalReturn = accounts.reduce((sum, account) => sum + account.returnPercent, 0);

    this.render(res, 'paper', {
      activePage: 'paper',
      title: 'Paper Trading | Crypto Bot',
      profiles,
      accounts,
      totalEquity,
      totalReturn: accounts.length > 0 ? totalReturn / accounts.length : 0
    });
  }

  private async reset(req: express.Request, res: express.Response): Promise<void> {
    const { profileId } = req.params;
    const profile = this.profileService.getProfile(profileId);

    if (profile) {
      this.paperService.resetAccount(profile.id, profile.exchange, profile.paperBalance);
    }

    res.redirect('/paper');
  }
}
