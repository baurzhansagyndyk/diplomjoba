import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { PgedComponent } from './pged/pged.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactComponent } from './contact/contact.component';
import { HighlightDirective } from './highlight.directive';
import { AlipbiComponent } from './alipbi/alipbi.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { ProfileComponent } from './modules/profile/profile.component';
import { AuthGuard } from './core/authGuard';
import { ModulesModule } from './modules/modules.module';
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './modules/sign-up/sign-up.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { PostDetailComponent } from './post-detail/post-detail.component';

import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';
import { PostFormComponent } from './post-form/post-form.component';
import { FavoritePostsComponent } from './favorite-posts/favorite-posts.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { ConverterComponent } from './converter/converter.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { ReportComponent } from './report/report.component';
import { ReportListComponent } from './report-list/report-list.component';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'tarih', component: PageComponent },
  { path: 'madeniet', component: PgedComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'alipbi', component: AlipbiComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'converter', component: ConverterComponent },
  { path: 'posts/create', component: PostCreateComponent },
  { path: 'posts/favorites', component: FavoritePostsComponent },
  { path: 'posts/my', component: UserPostsComponent },
  { path: 'posts/:postId', component: PostDetailComponent },
  { path: 'posts/:postId/edit', component: PostEditComponent },
  { path: 'reports', component: ReportListComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    PgedComponent,
    HomepageComponent,
    ContactComponent,
    HighlightDirective,
    AlipbiComponent,
    LoginComponent,
    TruncatePipe,
    PostDetailComponent,
    PostFormComponent,
    FavoritePostsComponent,
    PostListComponent,
    PostEditComponent,
    PostCreateComponent,
    ConverterComponent,
    UserPostsComponent,
    ReportComponent,
    ReportListComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    ModulesModule,
    MarkdownModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ReportComponent],
})
export class AppModule {}
